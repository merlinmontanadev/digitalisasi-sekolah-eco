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
      user: ref(null),
      token: ref(null),
      userFile: ref(null),
      foto: ref(null),
      loading: true,
      isFullContent: localStorage.getItem("is_fullContent") === "true",
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
    try {
      this.token = document.cookie
      .split('; ')
      .find(row => row.startsWith('refreshToken='))
      ?.split('=')[1];
      const decodedToken = jwtDecode(this.token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime){
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.token = null;
        this.$router.push('/'); 
        console.log('Token Expired')
        this.toast.info("Token telah kedaluwarsa, silakan login ulang.");
      }else{
        const exp = decodedToken.exp;
        const expDate = new Date(exp * 1000);
        console.log('Token valid sampai dengan', expDate.toLocaleString())
        this.user = decodedToken
        await this.fetchFoto(this.user?.user_id)
        this.loading = false;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }  
  },
  methods: {
    async fetchFoto(item){
      try {
        const userd = await getUsersById(item);
        if (userd && userd.file && userd.file.data && userd.file.data.length > 0) {
          const blob = new Blob([new Uint8Array(userd.file.data)], { type: userd.fileMimeType });
          this.userFile = URL.createObjectURL(blob);
        } else {
          this.userFile = '';
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
        this.userFile = null;
      }
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      localStorage.setItem("is_expanded", this.isSidebarVisible.toString());
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
