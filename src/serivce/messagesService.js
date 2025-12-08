import ENVIRONMENT from "../config/environment"
import { AUTH_TOKEN_KEY } from "../Context/AuthContext"

//GET api/workspace/:workspace_id/channel/:channel_id/messages
//Obtener la lista de mensajes de un canal

async function getMessagesByChannelId(channel_id, workspace_id) {

const response_http = await fetch(
        ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    ) 

    const response = await response_http.json()
    if(!response.ok){
        throw new Error('Error al obtener los canales')
    }
    return response
}

async function createMessage(channel_id, workspace_id, message_text) {
    const response_http = await fetch(
        ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
                'Content-Type': 'application/json'
            },
            'Content-Type': 'application/json',
            body: JSON.stringify({ content: message_text })
        }
    ) 

    if (!response_http.ok) {
    throw new Error("Error al crear mensaje");
    }

    const response = await response_http.json()
    if(!response.ok){
        throw new Error('Error al crear el mensaje')
    }

    return response
        }

export {getMessagesByChannelId, createMessage}