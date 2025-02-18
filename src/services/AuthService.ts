/**
 * This function sends a GET request to the server to validate the token.
 */
async function validateToken(): Promise<boolean> {
    try {
        const response = await fetch('http://localhost:3000/auth/validate-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZW5pcyI6InBlbmlzIiwiaWF0IjoxNzM5OTA5OTAwLCJleHAiOjE3NDI1MDE5MDB9.DsArJ3ISPixju8X0FGzU9acYsRGPCHcsdylNgJN8BmQ`
            }
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export {validateToken};