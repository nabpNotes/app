
const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * This function sends a GET request to the server to fetch all lists in a group.
 * @param id - The id of the group
 * @returns The response from the server as json
 */
async function fetchListsByGroup(id: string) {
    try {
        const response = await fetch(`${API_URL}/list/${id}`, {
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
 * This function sends a POST request to the server to create a new list.
 * @param groupId
 * @param createListDto
 */
async function createList(groupId: String, createListDto: any) {
    try {
        const response = await fetch(`${API_URL}/list/${groupId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Sending JSON data
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Bearer token for authorization
            },
            body: JSON.stringify(createListDto),  // Sending the group data in the request body
        });

        if (!response.ok) {
            throw new Error('Failed to create list');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating group:', error);
        return { error: 'An unexpected error occurred', statusCode: 500 };
    }
}

export { fetchListsByGroup, createList };