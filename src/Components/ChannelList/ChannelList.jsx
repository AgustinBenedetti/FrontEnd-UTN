import React from "react";
import { Link, useParams } from "react-router";
import "./ChannelList.css";

const ChannelList = ({ channel_list }) => {
  const { workspace_id } = useParams();

  if (!channel_list || channel_list.length === 0) {
    return (
      <div className="channel-list channel-list--empty">
        <p>No hay canales disponibles</p>
      </div>
    );
  }

  return (
    <nav className="channel-list">
      {channel_list.map((channel) => (
        <Link
          key={channel._id}
          to={`/workspace/${workspace_id}/${channel._id}`}
          className="channel-list__item"
        >
          <span className="channel-list__hash">#</span>
          <span className="channel-list__name">{channel.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default ChannelList;
