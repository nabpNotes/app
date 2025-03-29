
import {hashPassword} from "./AuthService";
import * as string_decoder from "node:string_decoder";

import defaultProfilePicture from "../assets/icons/exampleProfilePicture.svg";

const API_URL = import.meta.env.VITE_API_URL as string;

interface User {
    userId: string;
    name: string;
    profileImage: string;
    added: boolean;
}

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

/**
 * This function sends a DELETE Request to the api to delete a user
 */
const deleteAccount = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return { error: "User not authenticated", statusCode: 401 };
        }

        const response = await fetch(`${API_URL}/user`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const updatedUser = await response.json();
        console.log(updatedUser);
        return updatedUser;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
}

/**
 * This function sends a PATCH request to the api for updating the password
 * @param password the new password
 * @param oldPassword the user's old password
 */
const updatePassword = async (password: string, oldPassword: string) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return { error: "User not authenticated", statusCode: 401 };
        }

        password = hashPassword(password);
        oldPassword = hashPassword(oldPassword);

        const response = await fetch(`${API_URL}/user/password`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ password, oldPassword }),
        });
        const updatedUser = await response.json();
        console.log(updatedUser);
        return updatedUser;
    } catch (error) {
        console.error(error);
        return {error: 'An unexpected Error Occurred', statusCode: 500};
    }
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

export { updateNickname, deleteAccount, updatePassword, fetchUsers };
