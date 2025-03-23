
const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * This function sends a GET request to the server to fetch all lists in a group.
 * @param id - The id of the group
 * @param requestData - The data to update the list item with
 * @returns The response from the server as json
 */
async function updateListItem(id: string, requestData: any) {
    try {
        const response = await fetch(`${API_URL}/list-item/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

export { updateListItem };