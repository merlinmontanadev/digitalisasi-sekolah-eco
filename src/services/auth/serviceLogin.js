import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:9000/login', { username, password });
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to login');
    }
};