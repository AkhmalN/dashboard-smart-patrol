<script setup>
import { CCard, CCardBody, CCol, CRow, CSpinner } from '@coreui/vue'
import AppBarChartStatus from '../../components/AppBarChartStatus.vue'
import AppWidget from '../widgets/AppWidget.vue'
import { usePatroliStore } from '../../stores/patroli'
import { onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { usePosStore } from '../../stores/pos'
import AppBarChartInstansi from '../../components/AppBarChartInstansi.vue'
import AppPieChart from '../../components/AppPieChart.vue'
import { useAbsensiStore } from '../../stores/absensi'
import { useAktivitasStore } from '../../stores/aktivitas.js'

const userStore = useUserStore()
const absensiStore = useAbsensiStore()
const patroliStore = usePatroliStore()
const posStore = usePosStore()
const aktivitasStore = useAktivitasStore()

onMounted(() => {
  patroliStore.fetchPatroli()
  posStore.fetchPos()
  userStore.fetchUsers()
  absensiStore.fetchAbsensi()
  aktivitasStore.fetchAktivitas()
})
</script>

<template>
  <AppWidget />

  <CRow class="g-4 mt-2">
    <!-- Chart Status -->
    <CCol xs="12" md="6">
      <CCard>
        <CCardBody>
          <template v-if="patroliStore.loading">
            <CSpinner color="secondary" size="sm" />
            <span class="text-secondary">Loading...</span>
          </template>
          <AppBarChartStatus v-else />
        </CCardBody>
      </CCard>
    </CCol>

    <!-- Chart Instansi -->
    <CCol xs="12" md="6">
      <CCard>
        <CCardBody>
          <template v-if="patroliStore.loading">
            <CSpinner color="secondary" size="sm" />
            <span class="text-secondary">Loading...</span>
          </template>
          <AppBarChartInstansi v-else />
        </CCardBody>
      </CCard>
    </CCol>

    <!-- Pie Chart Pos -->
    <CCol xs="12">
      <CCard>
        <CCardBody>
          <template v-if="posStore.loading">
            <CSpinner color="secondary" size="sm" />
            <span class="text-secondary">Loading...</span>
          </template>
          <AppPieChart v-else />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
