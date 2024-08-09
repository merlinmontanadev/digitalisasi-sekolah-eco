import { ref } from 'vue'
import axios from 'axios'
import { refreshToken } from '@/services/refreshToken/refreshToken.js';

async function getAllUsers(){
    try {
      const token = await refreshToken();
      const response = await axios.get('http://localhost:9000/api/v1/user',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const users = [...response.data.data];
      const userFormatted = users.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(response.data.data)
      return userFormatted;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
}

async function getUsersById(user_id){
  try {
    const token = await refreshToken();
    console.log('Token berhasil diambil untuk get user by ID')
    const response = await axios.get(`http://localhost:9000/api/v1/user/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
}

async function deleteUser(user_id) {
  try {
    const response = await axios.delete(`http://localhost:9000/api/v1/hapus/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

async function addUser(data) {
  try {
    const response = await axios.post('http://localhost:9000/api/v1/simpan/user', data);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

async function resetPaswword(user_id) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/reset/${user_id}`);
    return response.data; 
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

async function changeStatus(user_id, status) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/status/${user_id}`, status);
    return response.data;
  } catch (error) {
    console.log('Status :', user_id);
    console.error('Error updating user:', error);
    throw error;
  }
}

async function changeFoto(user_id, file) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/foto/${user_id}`, file);
    return response;
  } catch (error) {
    console.log('Dari Service :', user_id);
    console.error('Error updating user:', error);
    throw error;
  }
}

export { getAllUsers, deleteUser, addUser, getUsersById, resetPaswword, changeStatus, changeFoto};