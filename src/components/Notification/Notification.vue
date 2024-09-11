<script setup>
  import {
    MegaphoneIcon,
    XMarkIcon
  } from "@heroicons/vue/24/solid";
</script>
<template>
  <div v-if="showWelcomeMessage" class="mb-4 bg-gradient-to-r from-blue-500 to-blue-400 p-4 shadow-md rounded flex items-center transition-opacity duration-500">
  <div class="h-8 w-8 flex items-center justify-center rounded-full bg-white">
    <MegaphoneIcon class="h-5 w-5 text-blue-500"></MegaphoneIcon> 
  </div>
  <h3 class="ml-2 text-white text-sm md:text-normal">Welcome to Sistem Informasi Digitalisasi Sekolah.</h3>
  <button @click="closeItem(1)" class="ml-auto">
    <div class="h-6 w-6 flex items-center justify-center rounded-full bg-white">
      <XMarkIcon class="h-4 w-4 text-blue-500"></XMarkIcon> 
    </div>
  </button>
</div>
</template>

<script>
  export default {
    data() {
      return {
        showWelcomeMessage: true, // Atur false untuk menyembunyikan Selamat Datang
        showImportantInfo: true // Atur false untuk menyembunyikan Informasi Penting
      };
    },
    methods: {
      closeItem(index) {
        // Lakukan sesuatu saat tombol close diklik, misalnya menyembunyikan item
        if (index === 1) {
          this.showWelcomeMessage = false;
        } else if (index === 2) {
          this.showImportantInfo = false;
        }
      }
    }
  }
</script>