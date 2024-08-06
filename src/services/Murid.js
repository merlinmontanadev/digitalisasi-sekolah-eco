import { ref } from 'vue'
import axios from 'axios'
import { refreshToken } from '@/services/refreshToken/refreshToken.js';

async function getAllMurids(){
    try {
      const token = await refreshToken();
      const response = await axios.get('http://localhost:9000/api/v1/murid',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const murids = [...response.data.data];
      const muridFormatted = murids.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(response.data.data)
      return muridFormatted;
      } catch (error) {
        console.error('Error fetching murid data:', error);
        throw error;
      }
}

async function deleteMurid(id_murid) {
    try {
      const response = await axios.delete(`http://localhost:9000/api/v1/hapus/murid/${id_murid}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async function getMuridsById(id_murid){
    try {
      const token = await refreshToken();
      const response = await axios.get(`http://localhost:9000/api/v1/murid/${id_murid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  }

  
export { getAllMurids, deleteMurid, getMuridsById};