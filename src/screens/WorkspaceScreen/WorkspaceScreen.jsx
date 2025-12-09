import React, { useState } from "react";
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar";
import ChannelDetail from "../../Components/ChannelDetail/ChannelDetail";
import "./WorkspaceScreen.css";
import { useParams, useLocation, useNavigate } from "react-router";
import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm";
import Modal from "../../Components/Modal/Modal";
import { ChannelsProvider } from "../../Context/ChannelContext";

const WorkspaceScreen = () => {
  const { workspace_id, channel_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const workspaceName =
    location.state?.workspaceName ||
    sessionStorage.getItem("currentWorkspaceName") ||
    `Workspace ${workspace_id}`;

  const [openInvite, setOpenInvite] = useState(false);

  const isChannelSelected = !!channel_id || location.pathname.includes('/channel/');

  function handleExitWorkspace() {
    navigate("/home");
  }

  function handleBackToSidebar() {
    navigate(`/workspace/${workspace_id}`);
  }

  return (
    <ChannelsProvider>
      <div className="workspace-screen">
        
        <header className="workspace-header">
          <button 
            className="workspace-header__back-button"
            onClick={handleExitWorkspace}
            title="Exit Workspace"
          >
            <i className="bi bi-arrow-left"></i>
          </button>

          <div className="workspace-header__middle">
            {isChannelSelected && (
              <button 
                className="workspace-header__channel-nav"
                onClick={handleBackToSidebar}
              >
                <i className="bi bi-chevron-left"></i>
                <span className="channel-nav-text">Channels</span>
              </button>
            )}
          </div>

          <button
            className="workspace-header__invite-button"
            onClick={() => setOpenInvite(true)}
          >
            <i className="bi bi-person-plus-fill"></i>
          </button>
        </header>

        <div className={`workspace-layout ${isChannelSelected ? 'show-chat' : 'show-sidebar'}`}>
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