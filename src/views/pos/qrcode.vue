<script setup>
import { cilBarcode, cilQrCode, cilTrash } from '@coreui/icons'
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
import { onMounted, ref } from 'vue'
import { usePosStore } from '../../stores/pos'
import { generateQrCode } from '../../utils/generateQrcode'

const visibleModal = ref(false)
const store = usePosStore()
const qrcode = ref(null)
const loadingQr = ref(false)

const { data } = defineProps({
  data: {
    required: true,
  },
})

const toggleModal = (state) => {
  visibleModal.value = state
}

async function generate() {
  const dataToQr = {
    namaInstansi: data.nama_instansi,
    lokasiBarcode: data.lokasi_barcode,
  }
  loadingQr.value = true
  const response = await generateQrCode(dataToQr)
  qrcode.value = response
  setTimeout(() => {
    loadingQr.value = false
  }, 3000)
}

async function handleExport() {
  store.downloadQrcode(qrcode.value)
}
</script>

<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="toggleModal(true)"
    v-c-tooltip="{
      content: 'Barcode Pos.',
      placement: 'top',
    }"
  >
    <CIcon :icon="cilBarcode" size="xl" class="text-light" />
  </button>

  <CModal
    alignment="center"
    :visible="visibleModal"
    @close="toggleModal(false)"
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Cetak Barcode</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <p class="mb-3"><strong>Data Barcode:</strong> {{ data.lokasi_barcode }}</p>

      <div class="text-center">
        <CButton color="primary" @click="generate" :disabled="loadingQr" class="mb-3">
          <CIcon :icon="cilQrCode" class="me-2" />
          Generate QR Code
        </CButton>
      </div>

      <div v-if="qrcode" class="text-center">
        <img :src="qrcode" alt="QR Code" class="img-fluid" />
      </div>

      <div v-else-if="loadingQr" class="text-center">
        <CSpinner color="primary" size="sm" class="me-2" />
        <span>QR Code sedang diproses...</span>
      </div>

      <div v-else class="text-center text-muted">
        <span>Klik tombol Generate untuk menampilkan barcode</span>
      </div>
    </CModalBody>

    <CModalFooter>
      <CButton color="secondary" @click="toggleModal(false)">Tutup</CButton>
      <CButton color="primary" @click="handleExport" :disabled="!qrcode">
        <!-- <CSpinner color="light" class="text-sm" size="sm" v-show="store.loadingDelete" /> -->
        <span class="text-light">Cetak</span>
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<style scoped>
img {
  max-width: 80%;
  margin: 0 auto;
  display: block;
}

button:disabled {
  background-color: #d6d6d6 !important;
}
</style>
