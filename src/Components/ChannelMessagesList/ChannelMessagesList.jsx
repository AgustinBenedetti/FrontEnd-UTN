import React from 'react';
import { Link, useParams } from 'react-router';

const ChannelMessagesList = ({ messages }) => {
    const { channel_id, workspace_id } = useParams();

    return (
    <div className="message-list" style={{display: "flex", flexDirection:"column"}}>
      {
        messages.length === 0
        ? <p>No hay mensajes disponibles</p>
        : messages.map(
            (message) => {
                return (
                    <Link key={message._id} to={`/workspace/${workspace_id}/${channel_id}${message._id}`}>{message.content}</Link> 
                )
            }
        )
      }
    </div>
  );
}

export default ChannelMessagesList;