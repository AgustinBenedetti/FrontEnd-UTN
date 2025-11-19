import ENVIRONMENT from "../config/environment"
import { AUTH_TOKEN_KEY } from "../Context/AuthContext"

export async function getWorkspaces() {
    const response_http = await fetch(
        ENVIRONMENT.API_URL + '/api/workspace/',
        {
            method:'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }

    )

    if(!response_http.ok){
        throw new Error('Error al obtener los workspaces')
    }
    const response = await response_http.json()
    return response
}