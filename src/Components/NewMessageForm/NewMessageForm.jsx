import React, { useState } from "react";
import { createMessage } from "../../serivce/messagesService";
import "./NewMessageForm.css";
import { IoSend } from "react-icons/io5";

const NewMessageForm = ({ channelId, workspaceId, onMessageCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const newMessage = await createMessage(channelId, workspaceId, content);
      setContent("");

      if (onMessageCreated) onMessageCreated(newMessage);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();   
      handleSubmit();        
    }
  }

  return (
    <form className="new-message-form" onSubmit={handleSubmit}>
      <textarea
        className="new-message-form__textarea"
        placeholder="Write your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />

      {error && (
        <p className="new-message-form__error">{error}</p>
      )}

      <button
        type="submit"
        className="new-message-form__button"
        disabled={loading || !content.trim()}
      >
        {!loading && <IoSend size={20} />}
      </button>
    </form>
  );
};

export default NewMessageForm;
