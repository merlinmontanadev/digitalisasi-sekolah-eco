<script setup>
import { LockClosedIcon,UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid';
</script>
<template>
  <div class="absolute md:flex p-6 max-w-md mx-auto my-auto mobile-styling pc-styling">
    <div class="fixed top-[-25px] left-[-50px]" style="z-index: -1;">
      <div class="absolute bottom-[80px] left-[100px] w-[150px] h-[106px] border-2 border-purple-200 rounded-lg"></div>
      <div class="w-[170px] h-[142px] bg-purple-100 rounded-lg"></div>
    </div>
    <div class="bg-white shadow-lg p-6 max-w-md mx-auto rounded-lg">
      <div class="flex items-center justify-center mb-6">
        <img src="@/assets/img/Logo Login.png" alt="Logo" class="w-20 h-20 mr-2">
      </div>
      <h1 class="text-xl font-bold">Selamat Datang di SiAkad! 👋</h1>
      <h1 class="text-base">Silahkan masuk untuk mengakses dashboard.</h1>
      <form @submit.prevent="handlerLogin">
          <div class="my-6 relative">
            <label for="username" class="block text-base">Username</label>
              <div class="relative">
                <input type="text" name="username" v-model="username"
                class="border border-indigo-500 focus:outline-none py-2 pl-10 pr-2 rounded-md w-full sm:text-sm sm:leading-6">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon class="h-4 w-4 text-gray-500 text-center justify-center items-center"></UserIcon>
                </span>
              </div>
          </div>
        <div class="my-6 relative">
          <label for="password" class="block text-base">Password</label>
          <div class="flex text-center items-center">
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" name="password" v-model="password"
            class="border border-indigo-500 focus:outline-none py-2 pl-10 pr-2 rounded-md w-80 sm:text-sm sm:leading-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon class="h-4 w-4 text-gray-500 text-center justify-center items-center"></LockClosedIcon>
            </span>
          </div>
            <button @click="toggleShowPassword" type="button" id="showPassword" class="ml-2 bg-slate-100 rounded-full p-2 w-8 h-8">
              <template v-if="showPassword">
                <EyeSlashIcon class="h-4 w-4 text-black text-center justify-center items-center"></EyeSlashIcon>
              </template>
              <template v-else>
                <EyeIcon class="h-4 w-4 text-black text-center justify-center items-center"></EyeIcon>
              </template>
            </button>
          </div>
          </div>
        <div class="flex my-4 text-center">
          <input type="checkbox" id="saveInfo" v-model="saveInfo">
          <label for="saveInfo" class="text-sm ml-2">Remember Me</label>
        </div>
        <button type="submit"
          class=" text-white roundedflex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </form>
    </div>
    <div class="fixed bottom-[-40px] right-[-50px]" style="z-index: -1;">
      <div
        class="flex justify-center items-center w-[150px] h-[128px] border-dashed border-2 border-purple-100 rounded-lg">
        <div class="w-[105px] h-[96px] bg-purple-100 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { loginUser } from '@/services/auth/auth.js';

export default {
  name: 'Login',
  data() {
  return {
      toast: useToast(),  
      username: ref(null),
      password: ref(null),
      showPassword: false,
      saveInfo: false
    };
  },
setup() {
  const toast = useToast();
  return { toast }
}, 
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async handlerLogin() {
      const data = {
                        username: this.username,
                        password: this.password
                    };
      try {
        const response = await loginUser(data);
        Cookies.set('auth', true, { expires: 1/24}); // 1 hour
        this.toast.success("Login Berhasil");
        if (this.saveInfo) {
        // Logic to save info, e.g., storing in localStorage
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        } else {
          // Logic to clear saved info if not saving
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
        this.$router.push('/admin/dashboard');  
        return response.data
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.toast.error(error.response.data.message);
        } else {
          // Menampilkan pesan error default jika tidak ada pesan spesifik
          this.toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
        }
      }
    }
  },
  mounted() {
    // Optionally load saved info when component mounts
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      this.password = localStorage.getItem('password');
      this.saveInfo = true;
    }
  }
}
</script>