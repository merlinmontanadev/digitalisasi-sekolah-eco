import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9000', // Ganti dengan URL backend Anda
  withCredentials: true, // Mengirim cookie dengan setiap permintaan
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;