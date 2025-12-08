import ENVIRONMENT from "../config/environment";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext";

async function getChannelList(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    ) 

    const response = await response_http.json()
    if(!response.ok){
        throw new Error('Error al obtener los canales')
    }
    return response
}



async function createChannel(workspace_id, channel_name) {
    const response_http = await fetch(
        ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
                'Content-Type': 'application/json'
            },
            'Content-Type': 'application/json',
            body: JSON.stringify({ name: channel_name })
        }
    ) 

    if (!response_http.ok) {
    const errorBody = await response_http.json().catch(() => null);
    throw new Error(errorBody?.message || "Error al crear canal");
    }

    const response = await response_http.json();
    return response;
}

export { getChannelList, createChannel };