<script setup>
import { CChartPie } from '@coreui/vue-chartjs'
import { computed } from 'vue'
import { usePosStore } from '../stores/pos'

const store = usePosStore()
const barColors = ['#1B9E3E', '#F9B115', '#E55353']

const data = computed(() => {
  return {
    labels: ['Unas Pejaten', 'Unas Ragunan', 'Unas Bambu Kuning'],
    datasets: [
      {
        backgroundColor: barColors,
        data: [store.dataPejaten.length, store.dataRagunan.length, store.dataBambuKuning.length],
      },
    ],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false, // supaya ukuran fleksibel saat legend di kanan
  plugins: {
    legend: {
      position: 'right', // <- ini mengatur posisi legend
      labels: {
        usePointStyle: true, // opsional, agar bulatan legend lebih rapi
      },
    },
  },
}
</script>

<template>
  <div style="width: 60%; height: 80%">
    <CChartPie :data="data" :options="options" v-show="!store.loading" />
  </div>
</template>
