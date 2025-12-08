import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ChannelList from "../ChannelList/ChannelList";
import useFetch from "../../hooks/useFetch";
import { getChannelList } from "../../serivce/channelService";
import NewChannelForm from "../NewChannelForm/NewChannelForm";
import Modal from "../Modal/Modal";
import "./ChannelSidebar.css";
import { useChannels } from "../../Context/ChannelContext";

const ChannelSidebar = ({ workspaceName }) => {
  const { response, loading, error, sendRequest } = useFetch();
  const { workspace_id } = useParams();
  const { setChannels } = useChannels();

  const [openCreateChannel, setOpenCreateChannel] = useState(false);
  const [channelsCollapsed, setChannelsCollapsed] = useState(false);

  function loadchannelList() {
    sendRequest(async () => {
      return await getChannelList(workspace_id);
    });
  }

  useEffect(() => {
    if (workspace_id) {
      loadchannelList();
    }
  }, [workspace_id]);

  useEffect(() => {
    if (response && response.data?.channels) {
      setChannels(response.data.channels);
    }
  }, [response, setChannels]);

  return (
    <aside className="channel-sidebar">
      <div className="channel-sidebar__workspace-header">
        
          <span className="channel-sidebar__workspace-name">
            {workspaceName}
          </span>
          
      </div>

      <div className="channel-sidebar-header">
        <button
          type="button"
          className="channel-sidebar__deploy-button"
          onClick={() => setChannelsCollapsed((prev) => !prev)}
        >
          <i
            className={`bi bi-caret-${channelsCollapsed ? "right" : "down"}-fill`}
          ></i>
          <h3>Channels</h3>
        </button>
      </div>

      {!channelsCollapsed && (
        <>
          {loading && (
            <p className="channel-sidebar__status">Loading channels...</p>
          )}

          {response && (
            <ChannelList channel_list={response.data.channels} />
          )}

          {error && (
            <p className="channel-sidebar__status channel-sidebar__status--error">
              Error loading channels: {error.message}
            </p>
          )}
        </>
      )}

      <button
        type="button"
        className="channel-sidebar__add-button"
        onClick={() => setOpenCreateChannel(true)}
      >
        <span className="channel-sidebar__icon">+</span>
        <span className="channel-sidebar__name">Add Channels</span>
      </button>

      {openCreateChannel && (
        <Modal
          title="Create channel"
          onClose={() => setOpenCreateChannel(false)}
        >
          <NewChannelForm
            workspaceId={workspace_id}
            onChannelCreated={() => {
              loadchannelList();
              setOpenCreateChannel(false);
            }}
          />
        </Modal>
      )}
    </aside>
  );
};

export default ChannelSidebar;
