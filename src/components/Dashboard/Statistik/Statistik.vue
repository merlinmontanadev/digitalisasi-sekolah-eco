<script setup>
import { AcademicCapIcon, BuildingOffice2Icon, UsersIcon, UserGroupIcon, FlagIcon } from "@heroicons/vue/24/outline";
</script>
<template>
    <div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
    <template v-if="loading">
      <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-gray-300 animate-pulse']">
      <div class="px-6 py-4">
      </div>
      </div>
    </template>
    <template v-else>
      <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-emerald-400']">
      <div class="px-6 py-4">
        <p class="text-white font-bold">Pengguna</p>
        <div class="font-bold text-xl mb-2 text-white">{{totalUsers}}</div>
      </div>
      <div class="flex items-center px-6 py-6">
        <div :class="['h-14 w-14 flex items-center justify-center rounded-full bg-white']">
          <UsersIcon 
          :class="['h-8 w-8 text-emerald-400']" 
        />
        </div>
      </div>
    </div>
    </template>
    <!-- Card 1 -->
    <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-violet-400']">
      <div class="px-6 py-4">
        <p class="text-white font-bold">GTK</p>
        <div class="font-bold text-xl mb-2 text-white">0</div>
      </div>
      <div class="flex items-center px-6 py-6">
        <div :class="['h-14 w-14 flex items-center justify-center rounded-full bg-white']">
          <UserGroupIcon 
          :class="['h-8 w-8 text-violet-400']" 
        />
        </div>
      </div>
    </div>
    <!-- Card 2 -->
    <template v-if="loading">
      <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-gray-300 animate-pulse']">
      <div class="px-6 py-4">
      </div>
      </div>
    </template>
    <template v-else>
      <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-pink-400']">
      <div class="px-6 py-4">
        <p class="text-white font-bold">Murid</p>
        <div class="font-bold text-xl mb-2 text-white">{{totalMurids}}</div>
      </div>
      <div class="flex items-center px-6 py-6">
        <div :class="['h-14 w-14 flex items-center justify-center rounded-full bg-white']">
          <UserGroupIcon 
          :class="['h-8 w-8 text-pink-400']" 
        />
        </div>
      </div>
    </div>
    </template>
    <!-- Card 3 -->
    <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-indigo-400']">
      <div class="px-6 py-4">
        <p class="text-white font-bold">BKK</p>
        <div class="font-bold text-xl mb-2 text-white">0</div>
      </div>
      <div class="flex items-center px-6 py-6">
        <div :class="['h-14 w-14 flex items-center justify-center rounded-full bg-white']">
          <BuildingOffice2Icon 
          :class="['h-8 w-8 text-indigo-400']" 
        />
        </div>
      </div>
    </div>
    <!-- Card 4 -->
    <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-red-400']">
      <div class="px-6 py-4">
        <p class="text-white font-bold">Pelanggaran</p>
        <div class="font-bold text-xl mb-2 text-white">0</div>
      </div>
      <div class="flex items-center px-6 py-6">
        <div :class="['h-14 w-14 flex items-center justify-center rounded-full bg-white']">
          <FlagIcon 
          :class="['h-8 w-8 text-red-400']" 
        />
        </div>
      </div>
    </div>
    <!-- Card 5 -->
    <div :class="['max-w-2xl rounded-md overflow-hidden shadow-md md:col-span-1 flex justify-between bg-yellow-400']">
      <div class="px-6 py-4">
        <p class="text-white font-bold">Almuni</p>
        <div class="font-bold text-xl mb-2 text-white">0</div>
      </div>
      <div class="flex items-center px-6 py-6">
        <div :class="['h-14 w-14 flex items-center justify-center rounded-full bg-white']">
          <AcademicCapIcon 
          :class="['h-8 w-8 text-yellow-400']" 
        />
        </div>
      </div>
    </div>
    <!-- Card 4 -->
  </div>
</div>
</template>

<script>
import { fetchCountData } from '@/services/countPengguna.js';
import { fetchCountDataMurid } from '@/services/countMurid.js'

export default {

  data() {
    return {
      totalUsers: null, // Variabel untuk menyimpan total pengguna
      totalMurids: null,
      loading: true
    };
  },
  async mounted() {
    await this.fetchTotalPengguna();
    await this.fetchTotalMurid();
  },

  methods: {
    async fetchTotalPengguna() {
      try {
        const dataUser = await fetchCountData(); // Panggil fungsi fetchDataFromAPI
        // Ambil nilai total pengguna dari data API
        this.totalUsers = dataUser.total;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchTotalMurid(){
      try {
        const dataMurid = await fetchCountDataMurid(); // Panggil fungsi fetchDataFromAPI
        // Ambil nilai total pengguna dari data API
        this.totalMurids = dataMurid.total;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};

</script>