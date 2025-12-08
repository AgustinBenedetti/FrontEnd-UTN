// components/InviteUserForm/InviteUserForm.jsx
import React, { useState } from "react";
import { inviteUserToWorkspace } from "../../serivce/workspaceService";


const InviteUserForm = ({ workspaceId }) => {

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      await inviteUserToWorkspace(workspaceId, email, role);

      setEmail("");
      setRole("member");

      setSuccessMsg("Invitación enviada correctamente.");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar la invitación.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Invite User</h4>

      <input
        type="email"
        placeholder="correo@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      {/* 👇 Selector de rol */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        disabled={loading}
      >
        <option value="member">Miembro</option>
        <option value="admin">Administrador</option>
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p>{successMsg}</p>}

      <button type="submit" disabled={loading || !email.trim()}>
        {loading ? "Enviando..." : "Enviar invitación"}
      </button>
    </form>
  );
};

export default InviteUserForm;
