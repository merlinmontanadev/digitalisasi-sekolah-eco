import apiClient from '@/services/axios/axios.js';

export const logoutUser = async () => {
    try {
        const response = await apiClient.delete('http://localhost:9000/logout');
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to login');
    }
};