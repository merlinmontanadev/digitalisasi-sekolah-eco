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
                class="border border-blue-500 focus:outline-none py-2 pl-10 pr-2 rounded-md w-full sm:text-sm sm:leading-6">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon class="h-4 w-4 text-gray-500 text-center justify-center items-center"></UserIcon>
                </span>
              </div>
          </div>
        <div class="my-6 relative">
          <label for="password" class="block text-base">Password</label>
          <div class="relative flex text-center items-center">
  <div class="relative">
    <input :type="showPassword ? 'text' : 'password'" name="password" v-model="password"
      class="border border-blue-500 focus:outline-none py-2 pl-10 pr-12 rounded-md w-80 sm:text-sm sm:leading-6">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <LockClosedIcon class="h-4 w-4 text-gray-500 text-center justify-center items-center"></LockClosedIcon>
    </span>
  </div>
  <button @click="toggleShowPassword" type="button" id="showPassword" class="absolute right-2 text-gray-500 p-2 w-8 h-8 flex items-center justify-center">
    <template v-if="showPassword">
      <EyeSlashIcon class="h-4 w-4 text-gray-500"></EyeSlashIcon>
    </template>
    <template v-else>
      <EyeIcon class="h-4 w-4 text-gray-500"></EyeIcon>
    </template>
  </button>
</div>
          </div>
        <button type="submit"
          class=" text-white roundedflex w-full justify-center rounded-md bg-gradient-to-r from-blue-700 to-blue-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:shadow-form focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Login</button>
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
      username: '',
      password: '',
      showPassword: false,
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
        this.toast.success(response.message);
        this.$router.push('/admin/dashboard');  
      } catch (error) {
        const errorMessage = error.message

        if(errorMessage === "An internal server error occurred"){
          this.toast.error("Error Connection");
        }
        
        if(errorMessage === "Cannot read properties of undefined (reading 'data')"){
            this.toast.error("Error Connection");
        }else{
            this.toast.error(errorMessage);
        }
      }
    }
  },
}
</script>