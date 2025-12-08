import React, { useEffect, useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router";
import Modal from "../../Components/Modal/Modal";
import NewWorkspaceForm from "../../Components/NewWorkspaceForm/NewWorkspaceForm";
import { getWorkspaces } from "../../serivce/workspaceService";
import "./HomeScreen.css";
import WorkspaceAvatar from "../../Components/WorkspaceAvatar/WorkspaceAvata";
import { TbLogout2 } from "react-icons/tb";
import { AuthContext } from "../../Context/AuthContext";

const HomeScreen = () => {
  const { sendRequest, response, loading, error } = useFetch();
  const [openCreateWorkspace, setOpenCreateWorkspace] = useState(false);
  const { onLogout } = useContext(AuthContext);

  function loadWorkspaces() {
    sendRequest(() => getWorkspaces());
  }

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const workspaces = response?.data?.workspaces || [];
  const userEmail = localStorage.getItem("user_email");

  return (
    <div className="home-screen">
      <button
        type="button"
        className="home-screen__logout-floating"
        onClick={onLogout}
        title="Logout"
      >
        <TbLogout2 className="home-screen__logout-icon" />
      </button>

      <div className="home-screen__card">
        <header className="home-screen__card-header">
          <div>
            <h1 className="home-screen__title">
              Workspaces{userEmail ? ` of ${userEmail}` : ""}
            </h1>
            <p className="home-screen__subtitle">
              Select a workspace to start collaborating
            </p>
          </div>

          <button
            type="button"
            className="home-screen__create-button"
            onClick={() => setOpenCreateWorkspace(true)}
          >
            <i className="bi bi-plus-circle"></i> Create
          </button>
        </header>

        <div className="home-screen__list-container">
          {loading && <span>Loading...</span>}

          {error && <p className="home-screen__error">{error.message}</p>}

          {!loading && !error && (
            <>
              {workspaces.length === 0 ? (
                <p className="home-screen__empty">
                  You don&apos;t have any workspaces yet. Create one to get
                  started.
                </p>
              ) : (
                <ul className="workspace-list">
                  {workspaces.map((workspace) => (
                    <li
                      key={workspace.workspace_id}
                      className="workspace-item"
                    >
                      <div className="workspace-item__info">
                        <WorkspaceAvatar
                          name={workspace.workspace_name}
                          imageUrl={workspace.workspace_url_image}
                        />
                        <div className="workspace-item__text">
                          <span className="workspace-item__name">
                            {workspace.workspace_name}
                          </span>
                          {workspace.workspace_role && (
                            <span className="workspace-item__role">
                              {workspace.workspace_role}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/workspace/${workspace.workspace_id}`}
                        state={{ workspaceName: workspace.workspace_name }}
                        onClick={() => {
                          sessionStorage.setItem(
                            "currentWorkspaceName",
                            workspace.workspace_name
                          );
                        }}
                        className="workspace-item__action"
                      >
                        <i className="bi bi-box-arrow-in-right" />
                        <span>Open</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {openCreateWorkspace && (
          <Modal
            title="Create Workspace"
            onClose={() => setOpenCreateWorkspace(false)}
          >
            <NewWorkspaceForm
              onWorkspaceCreated={() => {
                loadWorkspaces();
                setOpenCreateWorkspace(false);
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
