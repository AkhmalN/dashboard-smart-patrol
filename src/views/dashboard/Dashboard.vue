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

const userStore = useUserStore()
const absensiStore = useAbsensiStore()
const patroliStore = usePatroliStore()
const posStore = usePosStore()

onMounted(() => {
  patroliStore.fetchPatroli()
  posStore.fetchPos()
  userStore.fetchUsers()
  absensiStore.fetchAbsensi()
})
</script>

<template>
  <AppWidget />
  <CRow class="row row-cols-2">
    <CCol>
      <CCard class="mt-4">
        <CCardBody>
          <template v-if="patroliStore.loading">
            <CSpinner color="secondary" class="text-sm" size="sm" />
            <span class="text-secondary">Loading...</span>
          </template>
          <AppBarChartStatus v-else />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol>
      <CCard class="mt-4">
        <CCardBody>
          <template v-if="patroliStore.loading">
            <CSpinner color="secondary" class="text-sm" size="sm" />
            <span class="text-secondary">Loading...</span>
          </template>
          <AppBarChartInstansi v-else />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol>
      <CCard class="mt-4">
        <CCardBody>
          <template v-if="posStore.loading">
            <CSpinner color="secondary" class="text-sm" size="sm" />
            <span class="text-secondary">Loading...</span>
          </template>
          <AppPieChart v-else />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
