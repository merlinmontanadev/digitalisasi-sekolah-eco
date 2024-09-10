import axios from 'axios';
import router from '../../router'; // Pastikan router diimport agar bisa redirect
import { useToast } from 'vue-toastification'; // Import Toast untuk menampilkan pesan error
import Cookies from 'js-cookie';

const toast = useToast(); // Inisialisasi Toast

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000', // Ganti dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  response => response, // Jika response sukses, lanjutkan
  error => {
    // Cek jika error dari response adalah token expired
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        // Jika token expired, hapus cookie dan redirect ke login
        Cookies.remove('refreshToken');
        toast.error('Session expired. Please log in again.'); // Tampilkan pesan toast
        router.push({ name: 'Login' }); // Redirect ke halaman login
      }
    }
    return Promise.reject(error); // Jika bukan error 401, teruskan errornya
  }
);

export default axiosInstance;