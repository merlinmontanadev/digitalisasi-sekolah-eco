import axios from 'axios';

export const refreshToken = async () => {
    try {
        const response = await axios.get('http://localhost:9000/token');
        return response.data.accessToken;
    } catch (error) {
        console.log('Gagal Mendapatkan RefreshToken', error)
    }
};