import React, { useState } from "react";
import { createChannel } from "../../serivce/channelService";
import "./NewChannelForm.css";

const NewChannelForm = ({ workspaceId, onChannelCreated }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    try {
      await createChannel(workspaceId, name);
      setName("");

      if (onChannelCreated) {
        onChannelCreated();
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el canal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="new-channel-form" onSubmit={handleSubmit}>
      <label className="new-channel-form__field">
        <span>Channel name</span>
        <input
          className="new-channel-form__input"
          placeholder="Nombre del nuevo canal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </label>

      {error && (
        <p className="new-channel-form__error">{error}</p>
      )}

      <button
        type="submit"
        className="new-channel-form__button"
        disabled={loading || !name.trim()}
      >
        {loading ? "Creando..." : "Crear canal"}
      </button>
    </form>
  );
};

export default NewChannelForm;
