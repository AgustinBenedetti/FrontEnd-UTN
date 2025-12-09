import React, { useState } from "react";
import { createWorkspace } from "../../serivce/workspaceService";
import "./NewWorkspaceForm.css"; 

const NewWorkspaceForm = ({ onWorkspaceCreated }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !imageUrl.trim()) return;

    setLoading(true);
    setError("");

    try {
      await createWorkspace(imageUrl, name);
      setName("");
      setImageUrl("");

      if (onWorkspaceCreated) {
        onWorkspaceCreated();
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el workspace.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="workspace-form" onSubmit={handleSubmit}>
      <div className="workspace-form__field">
        <label>Workspace name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="My new workspace"
          disabled={loading}
        />
      </div>

      <div className="workspace-form__field">
        <label>Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.png"
          disabled={loading}
        />
      </div>

      {error && <p className="workspace-form__error">{error}</p>}

      <button
        type="submit"
        className="workspace-form__button"
        disabled={loading || !name.trim() || !imageUrl.trim()}
      >
        {loading ? "Creating..." : "Create Workspace"}
      </button>
    </form>
  );
};

export default NewWorkspaceForm;
