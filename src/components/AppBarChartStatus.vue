<script setup>
import { CChartBar } from '@coreui/vue-chartjs'
import { usePatroliStore } from '../stores/patroli'
import { computed } from 'vue'

const store = usePatroliStore()
const barColors = ['#1B9E3E', '#F9B115', '#E55353', '#6B7785']

const chartData = computed(() => {
  return {
    labels: ['Aman', 'Demonstrasi', 'Kebakaran', 'Pencurian'],
    datasets: [
      {
        label: 'Patroli Satus Statistics',
        backgroundColor: barColors,
        data: [
          store.dataAman.length,
          store.dataDemonstrasi.length,
          store.dataKebakaran.length,
          store.dataPencurian.length,
        ],
      },
    ],
  }
})
</script>

<template>
  <CChartBar :data="chartData" v-show="!store.loading" />
</template>
