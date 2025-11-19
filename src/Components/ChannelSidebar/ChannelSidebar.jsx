import React, { useEffect } from 'react';
import ChannelList from '../ChannelList/ChannelList';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router';
import { getChannelList } from '../../serivce/channelService';

const ChannelSidebar = () => {
    
    const {
        response,
        loading,
        error,
        sendRequest
    } = useFetch()
    const {workspace_id} = useParams()

    //Responsable de cargar la lista de canales
    function loadchannelList(){
        sendRequest(
            async () => {
                return await getChannelList(workspace_id)
            }
        )
    }


    //apenas se cargue el componente debemos intentar obtener la lista de canales
    //Tambien se debe re-ejecutar si se cambia el workspace_id
    useEffect(
        ()=>{
            loadchannelList()
        },
        [workspace_id] //Cada vez que cambie workspace_id re-ejecutar el efecto
    )


    return (
        <aside className="channel-sidebar">
            <h3>Canales:</h3>
            {
                loading && <p>Cargando canales...</p>
            }
            {
                response && <ChannelList channel_list={response.data.channels}/>
            }
            {
                error && <p style={{color:'red'}}>Error al cargar los canales: {error.message}</p>
            }
            
        </aside>
    );
};  

export default ChannelSidebar