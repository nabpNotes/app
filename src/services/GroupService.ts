
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

export { fetchGroups };