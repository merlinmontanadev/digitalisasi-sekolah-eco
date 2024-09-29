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
      return response;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
}

async function getUsersById(user_id){
  try {
    const token = await refreshToken();
    const response = await axios.get(`http://localhost:9000/api/v1/user/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;
    } catch (error) {
      console.error('Error fetching user by id:', error);
    }
}

async function deleteUser(user_id, user_logged_id) {
  try {
    const response = await axios.delete(`http://localhost:9000/api/v1/hapus/user/${user_id}`, {
      data: {
        user_logged_id: user_logged_id
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function addUser(data) {
  try {
    const response = await axios.post('http://localhost:9000/api/v1/simpan/user', data);
    return response.data;
  } catch (error) {
    console.error('Error adding user:');
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

async function changeContact(user_id, email, nohp){
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/contact/${user_id}`, {
      email, nohp
    });
    ;
    return response.data; 
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

async function changeStatus(user_id, status) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/status/${user_id}`, status);
    return response.data;
  } catch (error) {
    console.log('Status :', user_id);
    console.error('Error changing status user:', error);
    throw error;
  }
}

async function changeJK(user_id, gender) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/gender/${user_id}`, gender);
    return response.data;
  } catch (error) {
    console.log('Gender :', gender);
    console.error('Error changing gender user:', error);
    throw error;
  }
}

async function changeRole(user_id, role) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/role/${user_id}`, role);
    return response.data;
  } catch (error) {
    console.log('Role :', role);
    console.error('Error changing role user:', error);
    throw error;
  }
}

async function changeFoto(user_id, file) {
  try {
    const response = await axios.patch(`http://localhost:9000/api/v1/edit/user/foto/${user_id}`, file);
    return response;
  } catch (error) {
    console.log('Dari Service :', user_id);
    console.error('Error updating photo user:', error);
    throw error;
  }
}

async function fetchCountData() {
  try {
    const token = await refreshToken();
    const response = await axios.get('http://localhost:9000/api/v1/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });return response.data;
} catch (error) {
    console.error('Error fetching data:', error);
    throw error;
}
}

export { getAllUsers, deleteUser, addUser, getUsersById, changeContact, changeJK, resetPaswword, changeStatus, changeFoto, fetchCountData, changeRole};