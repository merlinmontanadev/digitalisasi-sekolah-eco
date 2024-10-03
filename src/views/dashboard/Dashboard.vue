<script setup>
import Statistik from '@/components/Dashboard/Statistik/Statistik.vue';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import Notiffication from '@/components/Notification/Notification.vue';
import InformationSchool from '@/components/Dashboard/InformationSchool/InformationSchool.vue';
</script>

<template>
      <Notiffication />
      <InformationSchool @show-dashboard="handleShowDashboard"/>
      <div v-if="showDashboard">
      <div class="flex item-center justify-between mt-4">
      <h1 class="font-bold text-3xl text-black">{{ $t('tittleDashboard') }}</h1>
      <!-- <Breadcrumbs/> -->
      </div>
      <!-- Statistik -->
      <Statistik class="mt-4" :totalUsers="totalUsers" :totalMurids="totalMurids"/>
      <div class="border-b border-gray-200 mt-8"></div>
      <div class="flex item-center justify-between mt-4">
      <h1 class="font-bold text-3xl text-black">{{ $t('tittleChart') }}</h1>
      </div>
      <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        <!-- Chart 1 -->
        <ChartPendidikanGTKVue />
        <!-- Chart 2 -->
        <ChartJenisKelaminMuridVue />
        <!-- Chart 3 -->
        <ChartTotalMuridVue />
        <!--Chart 4-->
        <ChartPelanggaran />
      </div>
      <div class="border-b border-gray-200 mt-8"></div>
    </div>
    <!-- Quick Action -->
      <div class="flex item-center justify-between mt-4">
      <h1 class="font-bold text-3xl text-black">{{ $t('tittleQuickAction') }}</h1>
      </div>
        <QuickAction />
  </template>
<script>
import ChartJenisKelaminMuridVue from '@/components/Dashboard/ChartJenisKelaminMurid/ChartJenisKelaminMurid.vue';
import ChartPendidikanGTKVue from '@/components/Dashboard/ChartPendidikanGTK/ChartPendidikanGTK.vue';
import ChartTotalMuridVue from '@/components/Dashboard/ChartTotalMurid/ChartTotalMurid.vue';
import ChartPelanggaran from '@/components/Dashboard/ChartPelanggaran/ChartPelanggaran.vue';
import QuickAction from '@/components/QuickAction/QuickAction.vue';
import { fetchCountData } from '@/services/pengguna/Pengguna.js';
import { fetchCountDataMurid } from '@/services/murid/Murid.js'
import { ref } from 'vue';

export default {
  components: {
    ChartJenisKelaminMuridVue,
    ChartPendidikanGTKVue,
    ChartTotalMuridVue,
    ChartPelanggaran,
    QuickAction
  },
    data() {
      return {
        showDashboard: false,
        isMinimized: false,
        totalUsers: null,
        totalMurids: null,
        loading: true
      };
    },
    methods: {
      minimize() {
        this.isMinimized = !this.isMinimized;
      },
      async handleShowDashboard(){
        this.showDashboard = true;
        await this.fetchTotalMurid();
        await this.fetchTotalPengguna();
      },
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
  }
</script>