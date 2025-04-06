<script setup>
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/vue'
import { ref, watch } from 'vue'
import { usePosStore } from '../../stores/pos'

const visibleModal = ref(false)
const instansiSelected = ref('UNAS Pejaten')
const inputLokasi = ref('')
const store = usePosStore()

const toggleModal = (state) => {
  visibleModal.value = state
}

async function handleSubmit() {
  const data = {
    nama_instansi: instansiSelected.value,
    lokasi_barcode: inputLokasi.value,
  }
  const response = await store.fetchAddPos(data)
  if (response.success) visibleModal.value = false
}
</script>

<template>
  <CButton color="primary" @click="toggleModal(true)">
    <span class="text-light m-2">Tambah</span>
    <CIcon :icon="cilPlus" class="text-light" />
  </CButton>

  <CModal
    alignment="center"
    :visible="visibleModal"
    @close="toggleModal(false)"
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Tambah Pos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCol xs="auto">
        <div class="mb-3">
          <CFormLabel for="select-instansi">Pilih Instansi</CFormLabel>
          <CFormSelect aria-label="Large select example" v-model="instansiSelected">
            <option value="UNAS Pejaten">UNAS Pejaten</option>
            <option value="UNAS Ragunan">UNAS Ragunan</option>
            <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
          </CFormSelect>
        </div>
      </CCol>

      <CCol>
        <CForm>
          <div class="mb-3">
            <CFormLabel id="label-lokasi-barcode" for="input-lokasi-barcode"
              >Masukkan lokasi Barcode</CFormLabel
            >
            <CFormInput
              id="input-lokasi-barcode"
              type="text"
              placeholder=""
              v-model="inputLokasi"
            />
          </div>
        </CForm>
      </CCol>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
      <CButton color="primary" @click="handleSubmit" :disabled="store.loadingAdd">
        <CSpinner color="light" class="text-sm" size="sm" v-show="store.loadingAdd" />
        <span> Save Changes </span>
      </CButton>
    </CModalFooter>
  </CModal>
</template>
