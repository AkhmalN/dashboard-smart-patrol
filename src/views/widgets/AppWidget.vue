<script setup>
import CIcon from '@coreui/icons-vue'
import { CCol, CLink, CWidgetStatsF } from '@coreui/vue'
import { cilContact, cilGroup, cilLocationPin, cilRecycle, cilShieldAlt } from '@coreui/icons'
import { useUserStore } from '../../stores/user'
import { useAbsensiStore } from '../../stores/absensi'
import { usePatroliStore } from '../../stores/patroli'
import { usePosStore } from '../../stores/pos'

const userStore = useUserStore()
const absensiStore = useAbsensiStore()
const patroliStore = usePatroliStore()
const posStore = usePosStore()
</script>

<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF color="primary" title="Users" :value="userStore.users.length">
        <template #icon>
          <CIcon :icon="cilGroup" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF color="info" title="Absensi" :value="absensiStore.absensiData.length">
        <template #icon>
          <CIcon :icon="cilContact" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF color="warning" title="Patroli" :value="patroliStore.patroliData.length">
        <template #icon>
          <CIcon :icon="cilShieldAlt" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF color="danger" title="Aktivitas" value="$1.999,50">
        <template #icon>
          <CIcon :icon="cilRecycle" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF color="warning" title="Pos Pejaten" :value="posStore.dataPejaten.length">
        <template #icon>
          <CIcon :icon="cilLocationPin" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF color="secondary" title="Pos Ragunan" :value="posStore.dataRagunan.length">
        <template #icon>
          <CIcon :icon="cilLocationPin" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsF
        color="primary"
        title="Pos Bambu Kuning"
        :value="posStore.dataBambuKuning.length"
      >
        <template #icon>
          <CIcon :icon="cilLocationPin" size="xl" />
        </template>
        <template #footer>
          <CLink
            class="fw-semibold font-xs text-body-secondary"
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
          </CLink>
        </template>
      </CWidgetStatsF>
    </CCol>
  </CRow>
</template>
