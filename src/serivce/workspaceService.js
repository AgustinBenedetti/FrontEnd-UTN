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

export async function inviteUserToWorkspace(workspace_id, email_invited, role_invited) {
  const response_http = await fetch(
    ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/invite`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email_invited:email_invited, 
        role_invited: role_invited 
      }),
    }
  );

  const response = await response_http.json().catch(() => null);

  if (!response_http.ok) {
    throw new Error(response?.message || "Error al invitar usuario");
  }

  return response;
}

// serivce/workspaceService.js
export async function createWorkspace(url_image,workspace_name) {
  const response_http = await fetch(
    ENVIRONMENT.API_URL + "/api/workspace/",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url_image: url_image, name: workspace_name })
    }
  );

  const response = await response_http.json().catch(() => null);

  if (!response_http.ok) {
    throw new Error(response?.message || "Error al crear workspace");
  }

  return response;
}
