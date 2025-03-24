const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * This function sends a PATCH request to the api for updating the nickname
 * @param nickname the new nickname
 */
const updateNickname = async (nickname: string) => {
    try {
        const userId = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            return { error: "User not authenticated", statusCode: 401 };
        }

        const response = await fetch(`${API_URL}/user/nickname`, {
           method: 'PATCH',
           headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
           },
            body: JSON.stringify({ nickname }),
        });
        const updatedUser = await response.json();
        console.log(updatedUser);
        return updatedUser;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

export { updateNickname };