<script setup>
import { ChartPieIcon } from "@heroicons/vue/24/solid";
</script>
<template>
    <div class="rounded-md shadow-md bg-white">
          <div>
            <div class="flex px-2 py-2 items-center bg-gray-100 shadow rounded-t-md">
              <div :class="['h-6 w-6 flex items-center justify-center rounded-full bg-gray-400']">
                <ChartPieIcon class="h-4 w-4 text-gray-100"></ChartPieIcon> 
              </div>
              <div class="ml-2 font-bold text-sm md:text-normal">{{ $t('charts3') }}</div>
            </div>
            <div class="flex px-4 py-4 items-center justify-center">
              <apexchart
        type="pie"
        :options="chartOptions"
        :series="series"
        class="h-full w-full relative"
      ></apexchart>
            </div>
          </div>
        </div>
</template>

<script>
import * as chartConfigTotalMurid from '@/stores/Chart/chartConfigTotalMurid.js'
export default {
  data: function() {
    return {
      series: chartConfigTotalMurid.seriesData,
          chartOptions: {
            chart: {
              type: 'pie',
            },
            labels: chartConfigTotalMurid.labels,
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
    };
  },
};
</script>