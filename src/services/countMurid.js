import axios from 'axios';
import { refreshToken } from '@/services/refreshToken/refreshToken.js';

export const fetchCountDataMurid = async () => {
    try {
        const token = await refreshToken();
        const response = await axios.get('http://localhost:9000/api/v1/murid', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}