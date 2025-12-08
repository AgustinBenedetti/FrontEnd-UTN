import React, { useState } from "react";
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar";
import ChannelDetail from "../../Components/ChannelDetail/ChannelDetail";
import "./WorkspaceScreen.css";
import { useParams, useLocation, useNavigate } from "react-router";
import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm";
import Modal from "../../Components/Modal/Modal";
import { ChannelsProvider } from "../../Context/ChannelContext";

const WorkspaceScreen = () => {
  const { workspace_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const workspaceName =
    location.state?.workspaceName ||
    sessionStorage.getItem("currentWorkspaceName") ||
    `Workspace ${workspace_id}`;

  const [openInvite, setOpenInvite] = useState(false);

  function handleBack() {
    navigate("/home"); // 🔙 AJUSTA si tu ruta es distinta
  }

  return (
    <ChannelsProvider>
      <div className="workspace-screen">
        
        <header className="workspace-header">
          <button 
            className="workspace-header__back-button"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left"></i>
          </button>

          <button
            className="workspace-header__invite-button"
            onClick={() => setOpenInvite(true)}
          >
            <i className="bi bi-person-plus-fill"></i>
          </button>
        </header>

        <div className="workspace-layout">
          <ChannelSidebar workspaceName={workspaceName} />
          <ChannelDetail />
        </div>

        {openInvite && (
          <Modal
            title={`Invite people to workspace ${workspaceName}`}
            onClose={() => setOpenInvite(false)}
          >
            <InviteUserForm workspaceId={workspace_id} />
          </Modal>
        )}
      </div>
    </ChannelsProvider>
  );
};

export default WorkspaceScreen;
