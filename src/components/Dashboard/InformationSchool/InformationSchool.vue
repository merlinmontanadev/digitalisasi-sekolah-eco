<script setup>
  import {
    MegaphoneIcon,
    XMarkIcon
  } from "@heroicons/vue/24/solid";
</script>
<template>
<div class="rounded-md shadow-md bg-white mb-4 flex flex-col">
  <div>
    <div class="flex px-2 py-2 items-center justify-end bg-gray-100 shadow rounded-t-md">
      <div class="h-6 w-6 flex items-center justify-center mr-2 rounded-full bg-gray-400">
        <span class="mdi text-xl mdi-window-minimize text-white"></span>
      </div>
    </div>
    <div class="flex flex-col px-4 py-4 items-center justify-center">
      <img src="@/assets/img/Logo Dashboard.jpg" alt="Logo Sekolah" class="h-72 mb-2 rounded">
      <h3 class="md:text-lg text-xs font-bold text-black">SMK DHARMA WIRAWAN</h3>
    </div>
  </div>
</div>
<div class="flex w-full justify-end">
  <button 
    class="text-sm items-center justify-center md:flex bg-gradient-to-r from-blue-500 to-blue-400 font-semibold text-white px-4 py-2 rounded-full">
    Tampilkan Dashboard
  </button>
</div>
</template>

<script>
  export default {
    data() {
      return {
        isMinimized: false
      };
    },
    methods: {
      minimize() {
        this.isMinimized = !this.isMinimized;
      }
    }
  }
</script>