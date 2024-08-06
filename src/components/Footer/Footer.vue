<script setup>
import { ref, onMounted } from 'vue';

// Membuat variabel ref untuk menyimpan tahun
const tahun = ref('');

// Menginisialisasi tahun saat komponen dipasang
onMounted(() => {
  // Membuat objek Date
  const tanggalSekarang = new Date();
  
  // Mendapatkan tahun dari objek Date
  tahun.value = tanggalSekarang.getFullYear().toString();
});
</script>

<template>
    <div class="flex item-center justify-between mt-4 pb-10 text-xs md:text-nowrap text-wrap px-4 md:px-0">
    <h3 class="font-bold text-gray-400">© {{ tahun }} | Sistem Informasi Digitalisasi</h3>
    <!-- <h3 class="font-bold text-gray-400 hover:text-gray-700"><a href="#">SMK Dharma Wirawan Bojonegoro</a></h3> -->
    </div>
</template>

