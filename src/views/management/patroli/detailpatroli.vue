<script setup>
import { cilMagnifyingGlass, cilPencil, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { usePatroliStore } from '../../../stores/patroli'

const { data } = defineProps({
  data: {
    required: true,
  },
})

const store = usePatroliStore()
const visibleModal = ref(false)
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
      store.fetchPatroliById(data)
    }
  },
)

watch(
  () => store.patroliDetail,
  (newUser) => {
    if (newUser) {
      formData.namaLengkap = newUser.nama_lengkap || ''
      formData.username = newUser.username || ''
      formData.namaInstansi = newUser.nama_instansi || ''
      formData.lokasiPos = newUser.lokasi_pos || ''
      formData.status = newUser.status || ''
      formData.notes = newUser.notes || ''
      formData.image = newUser.image || []
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
      <CModalTitle id="VerticallyCenteredExample">Detail Patroli</CModalTitle>
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
          <CRow>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-nama-instansi">Nama Instansi</CFormLabel>
                <CFormInput
                  id="input-nama-instansi"
                  type="text"
                  placeholder="Nama Instansi"
                  v-model="formData.namaInstansi"
                  required
                />
              </div>
            </CCol>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-status">Status</CFormLabel>
                <CFormInput
                  id="input-status"
                  type="text"
                  placeholder="Status"
                  v-model="formData.status"
                  required
                />
              </div>
            </CCol>
          </CRow>
          <CCol>
            <div class="mb-3">
              <CFormLabel for="input-lokasi-pos">Lokasi Pos</CFormLabel>
              <CFormInput
                id="input-lokasi-pos"
                type="text"
                placeholder="Lokasi Pos"
                v-model="formData.lokasiPos"
                required
              />
            </div>
          </CCol>

          <CRow>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-notes">Notes</CFormLabel>
                <CFormTextarea
                  rows="3"
                  id="input-notes"
                  placeholder="Notes"
                  v-model="formData.notes"
                  required
                ></CFormTextarea>
              </div>
            </CCol>
          </CRow>
          <CListGroup>
            <CFormLabel for="images">Dokumentasi</CFormLabel>
            <CListGroupItem v-for="img in formData.image">
              <CCardLink :href="img" target="_blank">Show image</CCardLink>
            </CListGroupItem>
          </CListGroup>
          <CModalFooter>
            <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
          </CModalFooter>
        </CForm>
      </template>
    </CModalBody>
  </CModal>
</template>
