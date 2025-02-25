
const API_URL = import.meta.env.VITE_API_URL as string;

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

export { fetchListsByGroup };