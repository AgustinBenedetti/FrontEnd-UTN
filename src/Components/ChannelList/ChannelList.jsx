import React from "react";
import { Link, useParams } from "react-router";

const ChannelList = ({channel_list}) => {
  
    const {workspace_id} = useParams()

    return (
    <div className="channel-list" style={{display: "flex", flexDirection:"column"}}>
      {
        channel_list.length === 0
        ? <p>No hay canales disponibles</p>
        : channel_list.map(
            (channel) => {
                return (
                    <Link key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}>{channel.name}</Link> 
                )
            }
        )
      }
    </div>
  );
};

export default ChannelList;