<template>
<body class="text-gray-800 bg-gray-50 h-full w-">
<Navbar @toggle-sidebar="toggleSidebar" @toggle-full-content="toggleFullContent" :user="user" :userFile="userFile" :loading="loading"/>
<Sidebar :is-sidebar-visible="isSidebarVisible" :user="user" :userFile="userFile" :loading="loading"/>
<main :class="mainClasses" class="md:ml-80 mx-auto min-h-screen transition-all">
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
import { getUsersById  } from '@/services/pengguna/Pengguna.js';

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
      username: ref(null),
      user: ref(null),
      token: ref(null),
      userFile: ref(null),
      foto: ref(null),
      loading: true,
      tokenCheckInterval: null,
      isFullContent: localStorage.getItem("is_fullContent") === "true",
      loadingError: false,
    };
  },
  setup() {
  const toast = useToast();
  return { toast }
}, 
computed: {
    mainClasses() {
      return {
        'w-full': this.isFullContent,
        'md:w-[calc(70%)]': !this.isFullContent,
      };
    },
  },
  async mounted() {
    window.addEventListener("keydown", this.handleKeyboardShortcut);
    window.addEventListener("keydown", this.handleFullShortcut);
    this.store();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyboardShortcut);
    window.removeEventListener("keydown", this.handleFullShortcut);
    
  },
  methods: {
    async store() {
    this.token = Cookies.get('refreshToken');
    if (this.token) {
        const decodedToken = jwtDecode(this.token);
        const currentTime = Date.now() / 1000;

        // Cek apakah token masih valid
        if (decodedToken.exp > currentTime) {
            try {
                // Coba fetch user dan foto
                await this.fetchUser(decodedToken?.user_id);
                await this.fetchFoto(decodedToken?.user_id);

                // Jika berhasil, set loading menjadi false
                this.loading = false;
                this.loadingError = false; // Tidak ada error, jadi reset loadingError
                
                // Cek token expiry secara berkala
                this.tokenCheckInterval = setInterval(() => {
                    this.checkTokenExpiry();
                }, 5000);
            } catch (error) {
                // Jika error karena backend tidak tersedia
                console.error('Error fetching data:', error);
                this.loadingError = true;
                this.loading = true; // Tetap menampilkan loading jika backend tidak bisa diakses
            }
        } else {
            // Token kedaluwarsa
            Cookies.remove('refreshToken');
            this.$router.push('/');
        }
    } else {
        // Jika tidak ada token, langsung redirect ke halaman login
        this.$router.push('/');
    }
},
    
    checkTokenExpiry() {
        const decodedToken = jwtDecode(this.token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            Cookies.remove('refreshToken');
            this.toast.info("Token telah kedaluwarsa, silakan login ulang.");
            this.$router.push('/');
        }
    },
    async fetchUser(item) {
      try {
        const userd = await getUsersById(item);
        this.user = userd;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async fetchFoto(item){
      try {
        const userd = await getUsersById(item);
        this.user = userd;
        if (userd && userd.file && userd.file.data && userd.file.data.length > 0) {
          const blob = new Blob([new Uint8Array(userd.file.data)], { type: userd.fileMimeType });
          this.userFile = URL.createObjectURL(blob);
        } else {
          this.userFile = '';
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
        this.userFile = null;
        this.user = null;
      }
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      localStorage.setItem("is_expanded", this.isSidebarVisible.toString());
    },
    handleFullShortcut(event) {
      if (event.key === "F11") {
        event.preventDefault();
        this.toggleFullContent();
        this.toggleSidebar();
      }
    },
    handleKeyboardShortcut(event) {
      if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        this.toggleSidebar();
        this.toggleFullContent();
      }
    },
    toggleFullContent() {
      this.isFullContent = !this.isFullContent;
      localStorage.setItem("is_fullContent", this.isFullContent.toString());
    },
  },
}
</script>

<!-- <style lang="scss" scoped>
.navbardw{
  overflow: auto;
}
</style> -->
