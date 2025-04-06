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
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '../../../stores/user'
import Swal from 'sweetalert2'

const store = useUserStore()
const visibleModal = ref(false)
const roleSelected = ref('anggota')
const unitSelected = ref('UNAS Pejaten')
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

async function handleSubmit() {
  const createData = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    role: roleSelected.value,
    no_hp: formData.nomerHp,
    domisili: formData.domisili,
    tempat_lahir: formData.tempatLahir,
    tanggal_lahir: formData.tanggalLahir,
    unit_kerja: unitSelected.value,
    nama_lengkap: formData.namaLengkap,
  }

  try {
    const response = await store.fetchAddUser(createData)
    if (response.status === 201) {
      visibleModal.value = false
      toggleModal(false)
      Swal.fire({
        title: 'Success!',
        text: 'Berhasil menambahkan data user',
        icon: 'success',
      })
      document.body.classList.remove('modal-open')
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Terjadi kesalahan saat menambahkan data user',
      icon: 'error',
    })
  }
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
      <CModalTitle id="VerticallyCenteredExample">Tambah user</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CRow>
          <CCol>
            <div class="mb-3">
              <CFormLabel id="label-nama-lengkap" for="input-nama-lengkap">
                Masukkan Nama Lengkap
              </CFormLabel>
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
              <CFormLabel id="label-username" for="input-username">Masukkan Username</CFormLabel>
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
              <CFormLabel id="label-email" for="input-email">Masukkan Email</CFormLabel>
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
              <CFormLabel id="label-password" for="input-password">Masukkan Password</CFormLabel>
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
        <!-- <CCol>
          <div class="mb-3">
            <CFormLabel id="label-nik" for="input-nik">Masukkan NIK</CFormLabel>
            <CFormInput
              id="input-nik"
              type="text"
              placeholder="NIK"
              v-model="formData.nik"
              required
            />
          </div>
        </CCol> -->
        <CRow>
          <CCol>
            <div class="mb-3">
              <CFormLabel id="label-tanggal-lahir" for="input-tanggal-lahir">
                Masukkan Tanggal Lahir
              </CFormLabel>
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
              <CFormLabel id="label-nomer-hp" for="input-nomer-hp">Masukkan Nomer HP</CFormLabel>
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
            <CFormLabel id="label-tempat-lahir" for="input-tempat-lahir">
              Masukkan Tempat Lahir
            </CFormLabel>
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
            <CFormSelect aria-label="Large select example" v-model="roleSelected">
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
            <CFormSelect aria-label="Large select example" v-model="unitSelected">
              <option value="UNAS Pejaten">UNAS Pejaten</option>
              <option value="UNAS Ragunan">UNAS Ragunan</option>
              <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
            </CFormSelect>
          </div>
        </CCol>
        <CRow>
          <CCol>
            <div class="mb-3">
              <CFormLabel id="label-domisili" for="input-domisili">Masukkan Domisili</CFormLabel>
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
          <CButton type="submit" color="primary" :disabled="store.loadingAdd">
            <CSpinner color="light" class="text-sm" size="sm" v-show="store.loadingAdd" />
            <span> Save Changes </span>
          </CButton>
        </CModalFooter>
      </CForm>
    </CModalBody>
  </CModal>
</template>
