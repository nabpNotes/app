
const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * This function sends a GET request to the server to fetch all groups.
 * @returns The response from the server as json
 */
async function fetchGroups() {
    try {
        const response = await fetch(`${API_URL}/group/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

/**
 * This function sends a GET request to the server to fetch a group.
 * @param id - The id of the group
 * @returns The response from the server as json
 */
async function fetchGroup(id: string) {
    try {
        const response = await fetch(`${API_URL}/group/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

async function fetchUserInGroup(id: string) {
    try {
        const response = await fetch(`${API_URL}/group/${id}/user`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

async function addGroupMember(groupId: string, username: string) {
    try {
        const response = await fetch(`${API_URL}/group/${groupId}/add/user/${username}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

/**
 * This function sends a POST request to the server to create a new group.
 * @param createGroupDto - The data used to create the group (including group name, members, etc.)
 * @returns The response from the server as json if successful, or an error object if something goes wrong.
 */
async function createGroup(createGroupDto: any) {
    try {
        const response = await fetch(`${API_URL}/group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Sending JSON data
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Bearer token for authorization
            },
            body: JSON.stringify(createGroupDto),  // Sending the group data in the request body
        });

        if (!response.ok) {
            throw new Error('Failed to create group');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating group:', error);
        return { error: 'An unexpected error occurred', statusCode: 500 };
    }
}

async function removeGroupMember(groupId: string, userId: string) {
    try {
        const response = await fetch(`${API_URL}/group/${groupId}/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

async function deleteGroup(id: string) {
    try {
        const response = await fetch(`${API_URL}/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}


export { fetchGroups, fetchGroup, fetchUserInGroup, createGroup, addGroupMember, removeGroupMember, deleteGroup };