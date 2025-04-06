<script setup>
import { cilLocationPin } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CSpinner } from '@coreui/vue'
import { ref, watch, nextTick, reactive } from 'vue'
import { useAbsensiStore } from '../../../stores/absensi'

const { data } = defineProps({
  data: {
    required: true,
  },
})

const L = window.L
const store = useAbsensiStore()
const visibleModal = ref(false)
const mapContainer = ref(null)
const coordinat = reactive({
  username: '',
  latitude: '',
  longitude: '',
})
let mapInstance = null
let marker = null // Store marker reference

const toggleModal = (state) => {
  visibleModal.value = state
}

const initMap = () => {
  // If map instance exists, update it, otherwise create a new one
  if (mapInstance && mapContainer.value) {
    mapInstance.setView([coordinat.latitude, coordinat.longitude], 13)
    // Update marker position if marker exists
    if (marker) {
      marker.setLatLng([coordinat.latitude, coordinat.longitude])
      marker.bindPopup(`User: ${coordinat.username}`).openPopup()
    }
  } else if (mapContainer.value) {
    mapInstance = L.map(mapContainer.value).setView([coordinat.latitude, coordinat.longitude], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance)

    // Create marker and bind popup
    marker = L.marker([coordinat.latitude, coordinat.longitude])
      .addTo(mapInstance)
      .bindPopup(`User: ${coordinat.username}`)
      .openPopup()
  }
}

watch(
  () => visibleModal.value,
  async (newData) => {
    if (visibleModal.value) {
      await nextTick()
      store.fetchAbsensiById(data)
      initMap()
    }
  },
)

watch(
  () => store.absensiDetail,
  (result) => {
    if (result) {
      coordinat.latitude = result.latitude
      coordinat.longitude = result.longitude
      coordinat.username = result.nama_lengkap
    }
  },
)

watch([() => coordinat.latitude, () => coordinat.longitude], () => {
  if (coordinat.latitude && coordinat.longitude) {
    initMap()
  }
})
</script>

<template>
  <CButton color="warning" variant="outline" @click="toggleModal(true)">
    <CIcon :icon="cilLocationPin" class="text-warning" />
  </CButton>

  <CModal
    alignment="center"
    :visible="visibleModal"
    @close="toggleModal(false)"
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">
        Map for user: {{ data.nama_lengkap }}
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <template v-if="store.loadingDetail">
        <div class="d-flex align-items-center gap-2">
          <CSpinner color="secondary" class="text-sm" size="sm" />
          <span class="text-secondary">Loading...</span>
        </div>
      </template>

      <template v-else>
        <p>Coordinates: {{ coordinat.latitude }}, {{ coordinat.longitude }}</p>
      </template>
      <div ref="mapContainer" style="height: 400px"></div>
    </CModalBody>
  </CModal>
</template>
