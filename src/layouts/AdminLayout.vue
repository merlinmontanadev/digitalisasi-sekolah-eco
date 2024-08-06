<template>
<body class="text-gray-800 bg-gray-50 h-full w-">
<Navbar @toggle-sidebar="toggleSidebar" :user="user" :userFile="userFile" :loading="loading"/>
<main class="w-full md:w-[calc(100%)] md:ml-80 mx-auto min-h-screen transition-all">
<Sidebar :is-sidebar-visible="isSidebarVisible" :user="user" :userFile="userFile" :loading="loading"/>
 <div class="py-4 mt-16 mx-6">
 <router-view />
</div>
<Footer />
  </main>
</body>
</template>
<script>
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { jwtDecode } from "jwt-decode";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from '@/components/Footer/Footer.vue';
import { useToast } from "vue-toastification";
import axios from 'axios';
import { refreshToken } from '@/services/refreshToken/refreshToken.js';
import { getUsersById } from '@/services/Pengguna.js';

export default {
  name: "admin-layout",
  components: {
    Sidebar,
    Navbar,
    Footer
  },
  data() {
    return {
      capital: "",
      toast: useToast(),
      isSidebarVisible: localStorage.getItem("is_expanded") === "true",
      user: ref(null),
      token: ref(null),
      userFile: ref(null),
      foto: ref(null),
      loading: true,
    };
  },
  setup() {
  const toast = useToast();
  return { toast }
}, 
  methods: {
    async fetchFoto(item){
      const userd = await getUsersById(item);
      this.foto = userd;
        if (userd && userd.file && userd.file.data && userd.file.data.length > 0) {
          // Convert buffer to blob
          const blob = new Blob([new Uint8Array(userd.file.data)], { type: userd.fileMimeType });
          // Create URL from blob
          this.userFile = URL.createObjectURL(blob);
          // console.log('User File:', this.userFile);
        } else {
          // Handle if there's no image data
          this.userFile = ''; // Set default image or show placeholder
        }
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      localStorage.setItem("is_expanded", this.isSidebarVisible.toString());
    },
    async refreshToken() {
      try {
        const dataUser = await refreshToken();
        const decodedToken = jwtDecode(dataUser);
        // console.log('ini adalah', decodedToken);
        this.token = dataUser
        this.user = decodedToken;
      } catch (error) {
        if(error.response){
          console.log('ini error')
          console.log(error.response)
        }
      }
    },
    async fetchDataUser(token) {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/user', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
      return response.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.refreshToken();
    await this.fetchDataUser(this.token);
    await this.fetchFoto(this.user?.user_id)
    this.loading = false;
  },
}
</script>

<!-- <style lang="scss" scoped>
.navbardw{
  overflow: auto;
}
</style> -->
