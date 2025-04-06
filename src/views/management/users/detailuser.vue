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
import { useUserStore } from '../../../stores/user'
import Swal from 'sweetalert2'

const { data } = defineProps({
  data: {
    required: true,
  },
})

const store = useUserStore()
const visibleModal = ref(false)
const roleSelected = ref('')
const unitSelected = ref('')
const formData = reactive({
  namaLengkap: '',
  username: '',
  email: '',
  password: '',
  tanggalLahir: '',
  nomerHp: '',
  tempatLahir: '',
  domisili: '',
})

const toggleModal = (state) => {
  visibleModal.value = state
}

watch(
  () => visibleModal.value,
  (newData) => {
    if (visibleModal.value) {
      store.fetchUserById(data)
    }
  },
)

watch(
  () => store.user,
  (newUser) => {
    if (newUser) {
      formData.namaLengkap = newUser.nama_lengkap || ''
      formData.username = newUser.username || ''
      formData.email = newUser.email || ''
      formData.password = newUser.password || ''
      formData.tanggalLahir = new Date(newUser.tanggal_lahir).toISOString().split('T')[0] || ''
      formData.nomerHp = newUser.no_hp || ''
      formData.tempatLahir = newUser.tempat_lahir || ''
      formData.domisili = newUser.domisili || ''
      roleSelected.value = newUser.role || ''
      unitSelected.value = newUser.unit_kerja || ''
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
      <CModalTitle id="VerticallyCenteredExample">Edit user</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <template v-if="store.loadingDetail">
        <div class="d-flex align-items-center gap-2">
          <CSpinner color="secondary" class="text-sm" size="sm" />
          <span class="text-secondary">Loading...</span>
        </div></template
      >
      <template v-else>
        <CForm>
          <CRow>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-nama-lengkap"> Masukkan Nama Lengkap </CFormLabel>
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
                <CFormLabel for="input-username">Masukkan Username</CFormLabel>
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
                <CFormLabel for="input-email">Masukkan Email</CFormLabel>
                <CFormInput
                  id="input-email"
                  type="email"
                  placeholder="Email"
                  v-model="formData.email"
                  required
                />
              </div>
            </CCol>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-password">Masukkan Password</CFormLabel>
                <CFormInput
                  id="input-password"
                  type="password"
                  placeholder="Password"
                  v-model="formData.password"
                  required
                />
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-tanggal-lahir"> Masukkan Tanggal Lahir </CFormLabel>
                <CFormInput
                  id="input-tanggal-lahir"
                  type="date"
                  v-model="formData.tanggalLahir"
                  required
                />
              </div>
            </CCol>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-nomer-hp">Masukkan Nomer HP</CFormLabel>
                <CFormInput
                  id="input-nomer-hp"
                  type="text"
                  placeholder="Nomer HP"
                  v-model="formData.nomerHp"
                  required
                />
              </div>
            </CCol>
          </CRow>
          <CCol>
            <div class="mb-3">
              <CFormLabel for="input-tempat-lahir"> Masukkan Tempat Lahir </CFormLabel>
              <CFormInput
                id="input-tempat-lahir"
                type="text"
                placeholder="Tempat Lahir"
                v-model="formData.tempatLahir"
                required
              />
            </div>
          </CCol>
          <CCol>
            <div class="mb-3">
              <CFormLabel for="select-role">Pilih Role</CFormLabel>
              <CFormSelect aria-label="Large select role" v-model="roleSelected">
                <option value="chief">Chief Security</option>
                <option value="danru">Danru</option>
                <option value="anggota">Anggota Security</option>
                <option value="admin">Admin</option>
              </CFormSelect>
            </div>
          </CCol>
          <CCol>
            <div class="mb-3">
              <CFormLabel for="select-unit">Pilih Unit Kerja</CFormLabel>
              <CFormSelect aria-label="Large select unit" v-model="unitSelected">
                <option value="UNAS Pejaten">UNAS Pejaten</option>
                <option value="UNAS Ragunan">UNAS Ragunan</option>
                <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
              </CFormSelect>
            </div>
          </CCol>
          <CRow>
            <CCol>
              <div class="mb-3">
                <CFormLabel for="input-domisili">Masukkan Domisili</CFormLabel>
                <CFormTextarea
                  rows="3"
                  id="input-domisili"
                  type="textarea"
                  placeholder="Domisili"
                  v-model="formData.domisili"
                  required
                ></CFormTextarea>
              </div>
            </CCol>
          </CRow>
          <CModalFooter>
            <CButton color="secondary" @click="toggleModal(false)"> Close </CButton>
          </CModalFooter>
        </CForm></template
      >
    </CModalBody>
  </CModal>
</template>
