<script setup>
import { CChartBar } from '@coreui/vue-chartjs'
import { usePatroliStore } from '../stores/patroli'
import { computed } from 'vue'

const store = usePatroliStore()
const barColors = ['#1B9E3E', '#F9B115', '#E55353', '#6B7785']

const chartData = computed(() => {
  return {
    labels: ['Unas Pejaten', 'Unas Ragunan', 'Unas Bambu Kuning'],
    datasets: [
      {
        label: 'Patroli Instansi Statistics',
        backgroundColor: barColors,
        data: [store.dataPejaten.length, store.dataRagunan.length, store.dataBambuKuning.length],
      },
    ],
  }
})
</script>

<template>
  <CChartBar :data="chartData" v-show="!store.loading" />
</template>
