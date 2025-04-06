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
import { useUserStore } from '../../../stores/user'
import Swal from 'sweetalert2'

const visibleModal = ref(false)
const store = useUserStore()

const { data } = defineProps({
  data: {
    required: true,
  },
})

const toggleModal = (state) => {
  visibleModal.value = state
}

async function handleSubmit() {
  const response = await store.fetchDeleteUser(data)
  if (response.status === 200) {
    visibleModal.value = false
    toggleModal(false)
    Swal.fire({
      title: 'Success!',
      text: 'Berhasil menghapus data user',
      icon: 'success',
    })
    document.body.classList.remove('modal-open')
    document.body.style.paddingRight = ''
    document.body.style.overflow = ''
  }
}
</script>

<template>
  <CButton color="danger" @click="toggleModal(true)">
    <CIcon :icon="cilTrash" class="text-light" />
  </CButton>

  <CModal
    alignment="center"
    :visible="visibleModal"
    @close="toggleModal(false)"
    aria-labelledby="VerticallyCenteredExample"
  >
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample">Hapus User</CModalTitle>
    </CModalHeader>
    <CModalBody> Hapus Data user {{ data.nama_lengkap }} ?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
      <CButton color="danger" @click="handleSubmit" :disabled="store.loadingDelete">
        <CSpinner color="light" class="text-sm" size="sm" v-show="store.loadingDelete" />
        <span class="text-light"> Hapus </span>
      </CButton>
    </CModalFooter>
  </CModal>
</template>
