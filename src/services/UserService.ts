import {hashPassword} from "./AuthService";
import * as string_decoder from "node:string_decoder";

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

export { updateNickname, deleteAccount, updatePassword };