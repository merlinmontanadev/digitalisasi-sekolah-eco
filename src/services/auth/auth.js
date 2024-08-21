import axios from 'axios';

async function loginUser(data) {
    try {
      const response = await axios.post('http://localhost:9000/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      return response.data; // Mengembalikan data respons jika berhasil
    } catch (error) {
      if (error) {
        // Jika ada respons dari server, lemparkan pesan kesalahan dari server
        throw new Error(error.response.data.message || 'Failed to login');
      } else {
        // Jika tidak ada respons dari server, lemparkan pesan kesalahan jaringan
        throw new Error('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    }
  }

async function logoutUser(){
    try {
        const response = await axios.delete('http://localhost:9000/logout');
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to logout');
    }
};



  export { logoutUser, loginUser };