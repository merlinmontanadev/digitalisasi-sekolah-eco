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
              <div class="ml-2 font-bold text-sm md:text-normal">{{ $t('charts2') }}</div>
            </div>
            <div class="flex px-4 py-4 items-center justify-center">
              <apexchart
        type="pie"
        ref="chart"
        :options="chartOptions" :series="series"
        class="h-full w-full relative md:h-full md:w-full"
      ></apexchart>
            </div>

          </div>
    </div>
</template>
<script>
import { fetchData } from '@/stores/Chart/chartConfigJK.js'

export default {
  data: function() {
    return {
      series: [],
      chartOptions: {
            chart: {
              type: 'pie',
            },
            labels: [],
            noData: {
              text: 'No data available',
              align: 'center',
              verticalAlign: 'middle',
              style: {
                color: '#999',
                fontSize: '14px'
              }
            },
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
  created: async function() {
    try {
      const data = await fetchData();
      // Update series and labels with fetched data
      if (data.seriesData[0] === 0 && data.seriesData[1] === 0) {
        this.series = []; // Set series to null to trigger noData option
      } else {
        this.series = data.seriesData;
        this.chartOptions.labels = data.labels;
      }
      this.$nextTick(() => {
        if (this.$refs.chart) {
          this.$refs.chart.updateOptions({
            series: this.series,
            labels: this.chartOptions.labels
          });
        }
      });
      
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  }
};
</script>

