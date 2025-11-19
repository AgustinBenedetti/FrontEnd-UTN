import ENVIRONMENT from "../config/environment";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext";

//GET /api/workspace/:workspace_id/channels
//obtiene la lista de canales
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


//POST /api/workspaces/:workspace_id/channels
//crea un nuevo canal
//Debes pasar por body el name
//body example: { name: "general" }
async function createChannel(workspace_id, channel_name) {
    const response_http = await fetch(
        ENVIRONMENT.API_URL + `/api/workspaces/${workspace_id}/channels`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    ) 

    if(!response_http.ok){
        throw new Error('Error al crear canal')
    }
    const response = await response_http.json()
    return response
}

export { getChannelList, createChannel };