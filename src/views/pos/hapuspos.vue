<script setup>
import { cilTrash } from '@coreui/icons'
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
import { ref } from 'vue'
import { usePosStore } from '../../stores/pos'

const visibleModal = ref(false)
const store = usePosStore()

const { data } = defineProps({
  data: {
    required: true,
  },
})

const toggleModal = (state) => {
  visibleModal.value = state
}

async function handleSubmit() {
  const response = await store.fetchDeletePos(data)
  visibleModal.value = false
  toggleModal(false)
  document.body.classList.remove('modal-open')
  document.body.style.paddingRight = ''
  document.body.style.overflow = ''
}
</script>

<template>
  <button type="button" class="btn btn-danger" @click="toggleModal(true)">
    <CIcon :icon="cilTrash" size="xl" class="text-light" />
  </button>

  <CModal
    alignment="center"
    :visible="visibleModal"
    @close="toggleModal(false)"
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Hapus Pos</CModalTitle>
    </CModalHeader>
    <CModalBody> Hapus Data pos {{ data.lokasi_barcode }} ?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
      <CButton color="danger" @click="handleSubmit" :disabled="store.loadingDelete">
        <CSpinner color="light" class="text-sm" size="sm" v-show="store.loadingDelete" />
        <span class="text-light"> Hapus </span>
      </CButton>
    </CModalFooter>
  </CModal>
</template>
