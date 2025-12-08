import React from "react";
import { useParams } from "react-router";
import "./ChannelMessagesList.css";

const getInitialFromName = (name) => {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
};

const formatTime = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Avatar SIEMPRE con inicial
const MessageAvatar = ({ name }) => {
  const initial = getInitialFromName(name);

  return (
    <div className="message-avatar">
      <span className="message-avatar__initial">{initial}</span>
    </div>
  );
};

const ChannelMessagesList = ({ messages }) => {
  const { channel_id, workspace_id } = useParams(); // por si lo necesitás luego

  if (!messages || messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>No hay mensajes disponibles</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => {
        const authorName = message.sender_name || "Usuario";
        const time = formatTime(message.messages_created_at);

        return (
          <div key={message._id} className="message-row">
            <MessageAvatar name={authorName} />

            <div className="message-row__body">
              <div className="message-row__header">
                <span className="message-row__author">{authorName}</span>
                {time && (
                  <span className="message-row__time">{time}</span>
                )}
              </div>

              <div className="message-row__content">
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChannelMessagesList;
