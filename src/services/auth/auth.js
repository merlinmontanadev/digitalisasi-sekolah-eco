import axios from 'axios';

async function loginUser(data){
    try {
        const response = await axios.post('http://localhost:9000/login', data);
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to login');
    }
};

async function logoutUser(){
    try {
        const response = await apiClient.delete('http://localhost:9000/logout');
        return response.data; // Jika Anda ingin mengembalikan data respons
    } catch (error) {
        throw new Error('Failed to logout');
    }
};



  export { logoutUser, loginUser };