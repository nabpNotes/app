import defaultProfilePicture from "../assets/icons/exampleProfilePicture.svg";

const API_URL = import.meta.env.VITE_API_URL as string;

interface User {
    userId: string;
    name: string;
    profileImage: string;
    added: boolean;
}

/**
 * This function sends a GET request to the server to fetch the list of users.
 * @return A promise that resolves to an array of user objects, or an empty array if an error occurs.
 */
const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data.map((user: any) => ({
            userId: user._id,
            name: user.username,
            profileImage: user.profilePictureExt || defaultProfilePicture,
            added: false,
        }));
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        return [];
    }
};


export { fetchUsers };