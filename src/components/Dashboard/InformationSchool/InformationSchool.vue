<script setup>
import { defineEmits } from 'vue';
import {
    MegaphoneIcon,
    XMarkIcon,
    AcademicCapIcon
  } from "@heroicons/vue/24/solid";

const emit = defineEmits(['show-dashboard']);
const showDashboard = () => {
  emit('show-dashboard');
};
</script>
<template>
<div class="rounded-md shadow-md mb-4 flex flex-col">
  <div>
    <div class="flex px-2 py-2 items-center bg-gray-100 shadow rounded-t-md">
      <div :class="['h-6 w-6 flex items-center justify-center rounded-full bg-gray-400']">
                <AcademicCapIcon class="h-4 w-4 text-gray-100"></AcademicCapIcon> 
      </div>
      <div class="ml-2 font-bold text-sm md:text-normal">{{ $t('infoSchool') }}</div>
      <!-- <button @click="hideItem()" class="ml-auto">
      <div class="h-6 w-6 flex items-center justify-center mr-2 rounded-full bg-gray-400">
        <span class="mdi text-xl mdi-window-minimize text-white"></span>
      </div>
    </button> -->
    </div>
        <div class="flex bg-white flex-col px-4 py-4 items-center justify-center">
          <img src="@/assets/img/smkdharmawirawanlogo.png" alt="Logo Sekolah" class="h-72 mb-2 rounded">
          <h3 class="md:text-lg text-xs font-bold text-black">SMK (SMKK) DHARMA WIRAWAN BOJONEGORO</h3>
          <h6 class="md:text- text-xs text-black">JL. Rajekwesi 21, Kel. Klangon, Kec. Bojonegoro, Kab. Bojonegoro Prov. Jawa Timur</h6>
          <h6 class="md:text- text-xs text-black">Telp. (0353) 887723</h6>
        </div>
  </div>
</div>
<div class="flex w-full justify-end">
  <button @click="showDashboard"
    class="text-sm items-center justify-center md:flex bg-gradient-to-r from-blue-500 to-blue-400 font-semibold text-white px-4 py-2 rounded-full">
    {{ $t('btnShowDashboard') }}
  </button>
</div>
</template>
<script>
export default {
  data(){
    return {
  
    }
  },
  methods: {
  }
}
</script>