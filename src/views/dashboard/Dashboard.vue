<script setup>
import Statistik from '@/components/Dashboard/Statistik/Statistik.vue';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import Notiffication from '@/components/Notification/Notification.vue';
import InformationSchool from '@/components/Dashboard/InformationSchool/InformationSchool.vue';
</script>

<template>
      <Notiffication />
      <InformationSchool />
      <div class="flex item-center justify-between mt-4">
      <h1 class="font-bold text-3xl text-black">Dashobard</h1>
      <!-- <Breadcrumbs/> -->
      </div>
      <!-- Statistik -->
      <Statistik class="mt-4"/>
      <div class="border-b border-gray-200 mt-8"></div>
      <div class="flex item-center justify-between mt-4">
      <h1 class="font-bold text-3xl text-black">Charts</h1>
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
      <!-- Quick Action -->
      <div class="border-b border-gray-200 mt-8"></div>
      <div class="flex item-center justify-between mt-4">
      <h1 class="font-bold text-3xl text-black">Quick Actions</h1>
      </div>
        <QuickAction />
  </template>
<script>
import ChartJenisKelaminMuridVue from '@/components/Dashboard/ChartJenisKelaminMurid/ChartJenisKelaminMurid.vue';
import ChartPendidikanGTKVue from '@/components/Dashboard/ChartPendidikanGTK/ChartPendidikanGTK.vue';
import ChartTotalMuridVue from '@/components/Dashboard/ChartTotalMurid/ChartTotalMurid.vue';
import ChartPelanggaran from '@/components/Dashboard/ChartPelanggaran/ChartPelanggaran.vue';
import QuickAction from '@/components/QuickAction/QuickAction.vue';

export default {
  components: {
    ChartJenisKelaminMuridVue,
    ChartPendidikanGTKVue,
    ChartTotalMuridVue,
    ChartPelanggaran,
    QuickAction
  }
}
</script>