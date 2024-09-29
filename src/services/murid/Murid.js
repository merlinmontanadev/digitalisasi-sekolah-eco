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
      console.error('Error deleting murid:', error);
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
        console.error('Error fetching murid by id:', error);
      }
  }

  async function simpanMurid(data){
    try {
      const response = await axios.post('http://localhost:9000/api/v1/simpan/murid', data);
      return response.data; // Jika Anda ingin mengembalikan data respons
      } catch (error) {
        console.error('Error saving murid:', error);
      }
  }

  async function fetchCountDataMurid(){
    try {
      const token = await refreshToken();
      const response = await axios.get('http://localhost:9000/api/v1/murid', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });return response.data;
  } catch (error) {
      console.error('Error counting data:', error);
      throw error;
  }
  }

  async function changeFoto(id_murid, file) {
    try {
      const response = await axios.patch(`http://localhost:9000/api/v1/edit/murid/foto/${id_murid}`, file);
      return response;
    } catch (error) {
      console.log('Dari Service :', id_murid);
      console.error('Error updating photo user:', error);
      throw error;
    }
  }

export { getAllMurids, deleteMurid, changeFoto, getMuridsById, simpanMurid, fetchCountDataMurid};