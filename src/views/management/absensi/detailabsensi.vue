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
import { ref } from 'vue'
import { useAbsensiStore } from '../../../stores/absensi'
import { cilMagnifyingGlass } from '@coreui/icons'

const visibleModal = ref(false)
const store = useAbsensiStore()

const { data } = defineProps({
  data: {
    required: true,
  },
})

const toggleModal = (state) => {
  visibleModal.value = state
}
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
      <CModalTitle id="VerticallyCenteredExample">Detail Absensi</CModalTitle>
    </CModalHeader>
    <CModalBody> Detail Absensi ?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
    </CModalFooter>
  </CModal>
</template>
