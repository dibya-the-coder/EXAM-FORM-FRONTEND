import axios from "axios";

/**Performs a GET request to the specified URL with authorization headers.
 *
 * @param {string} url - The endpoint URL to send the GET request to.
 * @returns {Promise<any>} - The response data from the API or an error message.
 */
export const GET = async (url) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL+url}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })
        .then(d => { return d; })
        .catch(e => { return e; });
        
        console.log(response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error :', error);
            return error.response?.data || error.message;
        } else if (error instanceof Error) {
            console.log('in catchBlock');
            return error.message;
        } else {
            console.log('in else');
            return String(error);
        }
    }
}

/**Performs a POST request to the specified URL with authorization headers and provided data.
 *
 * @param {string} url - The endpoint URL to send the POST request to.
 * @param {object} data - The data to send in the body of the POST request.
 * @returns {Promise<any>} - The response data from the API or an error message.
 */
export const POST = async (url, data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL+url}`, data, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }
        })
        .then(d => { return d.data; })
        .catch(e => { return e.response?.data || e.message; });
        
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || error.message;
        } else if (error instanceof Error) {
            return error.message;
        } else {
            return String(error);
        }
    }
}

/**Performs a PUT request to the specified URL with authorization headers and provided data.
 *
 * @param {string} url - The endpoint URL to send the PUT request to.
 * @param {object} data - The data to send in the body of the PUT request.
 * @returns {Promise<any>} - The response data from the API or an error message.
 */
export const PUT = async (url, data) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL+url}`, data, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }
        })
        .then(d => { return d.data; })
        .catch(e => { console.log(e); return e.response?.data || e.message; });
        
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || error.message;
        } else if (error instanceof Error) {
            return error.message;
        } else {
            return String(error);
        }
    }
}

/**Performs a DELETE request to the specified URL with authorization headers.
 *
 * @param {string} url - The endpoint URL to send the DELETE request to.
 * @returns {Promise<any>} - The response data from the API or an error message.
 */
export const DELETE = async (url) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL+url}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }
        })
        .then(d => { return d.data; })
        .catch(e => { return e.response?.data || e.message; });
        
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || error.message;
        } else if (error instanceof Error) {
            return error.message;
        } else {
            return String(error);
        }
    }
}
