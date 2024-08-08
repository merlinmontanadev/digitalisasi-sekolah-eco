import axios from 'axios';

export const simpanMurid = async (data) => {
    try {
        const response = await axios.post('http://localhost:9000/api/v1/simpan/murid', data);
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to save pengguna');
    }
};