<script setup>
import CIcon from '@coreui/icons-vue'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/vue'
import { reactive, ref, watch } from 'vue'
import { cilMagnifyingGlass } from '@coreui/icons'
import { useAktivitasStore } from '../../../stores/aktivitas'

const visibleModal = ref(false)
const store = useAktivitasStore()

const { data } = defineProps({
  data: {
    required: true,
  },
})

const formData = reactive({
  namaLengkap: '',
  username: '',
  namaInstansi: '',
  lokasiPos: '',
  status: '',
  notes: '',
  image: [],
})

const toggleModal = (state) => {
  visibleModal.value = state
}

watch(
  () => visibleModal.value,
  (newData) => {
    if (visibleModal.value) {
      store.fetchAktivitasById(data)
    }
  },
)

watch(
  () => store.aktivitasDetail,
  (newAktivitas) => {
    if (newAktivitas) {
      formData.namaLengkap = newAktivitas.nama_lengkap || ''
      formData.username = newAktivitas.username || ''
      formData.namaInstansi = newAktivitas.nama_instansi || ''
      formData.lokasiPos = newAktivitas.lokasi_pos || ''
      formData.status = newAktivitas.status || ''
      formData.notes = newAktivitas.notes || ''
      formData.image = newAktivitas.image || []
    }
  },
)
</script>
<template>
  <CButton color="primary" @click="toggleModal(true)">
    <CIcon :icon="cilMagnifyingGlass" class="text-light" />
  </CButton>

  <CModal
    alignment="center"
    :visible="visibleModal"
    @close="toggleModal(false)"
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Detail Aktivitas</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <template v-if="store.loadingDetail">
        <div class="d-flex align-items-center gap-2">
          <CSpinner color="secondary" class="text-sm" size="sm" />
          <span class="text-secondary">Loading...</span>
        </div>
      </template>
      <template v-else>
        <CForm>
          <CRow>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-nama-lengkap"> Nama Lengkap </CFormLabel>
                <CFormInput
                  id="input-nama-lengkap"
                  type="text"
                  placeholder="Nama Lengkap"
                  v-model="formData.namaLengkap"
                  required
                />
              </div>
            </CCol>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-username">Username</CFormLabel>
                <CFormInput
                  id="input-username"
                  type="text"
                  placeholder="Username"
                  v-model="formData.username"
                  required
                />
              </div>
            </CCol>
          </CRow>
        </CForm>
      </template>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
    </CModalFooter>
  </CModal>
</template>
