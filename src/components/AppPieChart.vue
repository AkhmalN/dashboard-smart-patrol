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
</script>

<template>
  <CChartPie :data="data" v-show="!store.loading" />
</template>
