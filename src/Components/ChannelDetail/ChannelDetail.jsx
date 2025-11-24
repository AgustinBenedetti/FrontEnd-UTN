import React, { useEffect } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { getMessagesByChannelId } from "../../serivce/messagesService";
import ChannelMessagesList from "../ChannelMessagesList/ChannelMessagesList";

const ChannelDetail = () => {
    const {channel_id, workspace_id}= useParams()
    if(!channel_id){
        return (
            <div><span>Canal no seleccionado</span></div>
        )
    }

    const {response, error, loading, sendRequest} = useFetch()

    function loadMessagesList(){
        sendRequest(
            async () => {
                return await getMessagesByChannelId(channel_id, workspace_id)
            }
        )
    } 

    useEffect(
        ()=>{
            loadMessagesList()
        },
        [channel_id, workspace_id] 
    )

    console.log(response, error, loading)

    return (
           <aside className="channel-detail">
            <h3>Mensajes:</h3>
            {
                loading && <p>Cargando mensajes...</p>
            }
            {
                response && <ChannelMessagesList messages={response.data.messages}/>
            }
            {
                error && <p style={{color:'red'}}>Error al cargar los mensajes: {error.message}</p>
            }
            
        </aside>
  );
};

export default ChannelDetail;