import axios from 'axios';

export const simpanPengguna = async (data) => {
    try {
        const response = await axios.post('http://localhost:9000/api/v1/simpan/user', data);
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to save pengguna');
    }
};