import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { getMessagesByChannelId } from "../../serivce/messagesService";
import ChannelMessagesList from "../ChannelMessagesList/ChannelMessagesList";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import "./ChannelDetail.css";
import { useChannels } from "../../Context/ChannelContext";

const ChannelDetail = () => {
  const { channel_id, workspace_id } = useParams();
  const { channels } = useChannels();
  const { response, error, loading, sendRequest } = useFetch();
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const messagesContainerRef = useRef(null);
  const prevMessageCountRef = useRef(0);

  function loadMessagesList() {
    sendRequest(async () => {
      return await getMessagesByChannelId(channel_id, workspace_id);
    });
  }

  useEffect(() => {
    if (channel_id && workspace_id) {
      loadMessagesList();
    }
  }, [channel_id, workspace_id]);

  useEffect(() => {
    setIsAtBottom(true);
    setHasNewMessages(false);
    prevMessageCountRef.current = 0;
  }, [channel_id]);

  const messages = response?.data?.messages || [];

  useEffect(() => {
    const container = messagesContainerRef.current;
    const count = messages.length;

    if (!container) {
      prevMessageCountRef.current = count;
      return;
    }

    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
    } else {
      if (count > prevMessageCountRef.current) {
        setHasNewMessages(true);
      }
    }

    prevMessageCountRef.current = count;
  }, [messages, isAtBottom]);


  function handleMessagesScroll() {
    const el = messagesContainerRef.current;
    if (!el) return;

    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 40;

    if (nearBottom) {
      setIsAtBottom(true);
      setHasNewMessages(false);
    } else {
      setIsAtBottom(false);
    }
  }

  if (!channel_id) {
    return (
      <div className="channel-main channel-main--empty">
        <span>Select a channel to start</span>
      </div>
    );
  }

  const currentChannel = channels.find((c) => c._id === channel_id);
  const channelName = currentChannel ? currentChannel.name : "Channel";

  return (
    <section className="channel-main">
      <header className="channel-main__header">
        <span className="channel-main__hash">#</span>
        <h3 className="channel-main__title">{channelName}</h3>
      </header>

      <div
        ref={messagesContainerRef}
        className="channel-main__messages"
        onScroll={handleMessagesScroll}
      >
        {loading && <p>Loading messages...</p>}

        {response && <ChannelMessagesList messages={messages} />}

        {error && (
          <p className="channel-main__error">
            Error loading messages: {error}
          </p>
        )}
      </div>

      {hasNewMessages && (
        <div className="channel-main__new-messages">
          <button
            type="button"
            onClick={() => {
              const el = messagesContainerRef.current;
              if (el) {
                el.scrollTop = el.scrollHeight;
              }
              setHasNewMessages(false);
              setIsAtBottom(true);
            }}
          >
            New messages ↓
          </button>
        </div>
      )}

      <div className="channel-main__input">
        <NewMessageForm
          channelId={channel_id}
          workspaceId={workspace_id}
          onMessageCreated={loadMessagesList}
        />
      </div>
    </section>
  );
};

export default ChannelDetail;