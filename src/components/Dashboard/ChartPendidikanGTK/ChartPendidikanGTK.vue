<script setup>
import { ChartBarIcon } from "@heroicons/vue/24/solid";
</script>
<template>
        <div class="rounded-md shadow-md bg-white">
          <div>
            <div class="flex px-2 py-2  items-center bg-gray-100 shadow rounded-t-md">
              <div :class="['h-6 w-6 flex items-center justify-center rounded-full bg-gray-400']">
                <ChartBarIcon class="h-4 w-4 text-gray-100"></ChartBarIcon> 
              </div>
              <div class="ml-2 font-bold text-sm md:text-normal">Pendidikan Guru dan Tenaga Pendidik </div>
            </div>
            <div class="flex px-4 py-4 items-center justify-center">
              <Bar :data="data" :options="chartOptions" :style="myStyles"/>
              <apexchart
        type="bar"
        :options="chartOptions"
        :series="series"
        class="h-full w-full relative"
      ></apexchart>
            </div>
          </div>
        </div>
</template>

<script>
import * as chartConfigPendidikan from '@/stores/Chart/chartConfigPendidikanGTK.js'
export default {
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        plotOptions: {
              bar: {
                borderRadius: 6,
                horizontal: false,
              }
            },
            dataLabels: {
              enabled: false
            },
        xaxis: chartConfigPendidikan.xaxisLabel,
      },
      series: chartConfigPendidikan.seriesData,
    };
  },
};
</script>