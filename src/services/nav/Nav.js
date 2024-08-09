import { ref } from 'vue'
import axios from 'axios'

async function getNav(){
    try {
        const response = await axios.get('http://localhost:9000/nav');
        return response;
        } catch (error) {
          console.error('Error fetching Menu :', error);
          throw error;
        }

}

export { getNav };