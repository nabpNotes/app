import CryptoJS from 'crypto-js';

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * This function sends a GET request to the server to validate the token.
 * @returns A boolean value indicating if the token is valid
 */
async function validateToken(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/auth/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * This function sends a POST request to the server to register a new user.
 * @param email - The email of the user
 * @param username - The username of the user
 * @param password - The password of the user
 * @returns The response from the server as json
 */
async function register(email: string, username: string, password: string) {
    password = CryptoJS.SHA256(password).toString();
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
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
 * This function sends a POST request to the server to log in a user.
 * @param username - The username of the user
 * @param password - The password of the user
 * @returns The response from the server as json
 */
async function login(username: string, password: string) {
    password = CryptoJS.SHA256(password).toString();
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
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
 * This function creates a hashed password for the client side
 * @param password the password that will be hashed
 */
function hashPassword(password: string) {
    return CryptoJS.SHA256(password).toString();
}

export {validateToken, register, login, hashPassword};