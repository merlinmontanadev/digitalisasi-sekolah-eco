import axios from 'axios';
import { refreshToken } from '@/services/refreshToken/refreshToken.js';

export const fetchCountData = async () => {
    try {
        const token = await refreshToken();
        console.log('Token berhasil diambil untuk Count Pengguna')
        const response = await axios.get('http://localhost:9000/api/v1/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}