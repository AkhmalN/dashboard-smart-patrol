<script setup>
import { onMounted, ref } from 'vue'
import { cilBarcode, cilFile } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CRow,
  CCol,
  CCard,
  CSpinner,
  CCardHeader,
  CFormSelect,
  CButton,
  CCardBody,
  CPagination,
  CPaginationItem,
} from '@coreui/vue'
import { computed } from 'vue'
import Tambahuser from './tambahuser.vue'
import Hapususer from './hapususer.vue'
import Edituser from './edituser.vue'
import Detailuser from './detailuser.vue'
import { useUserStore } from '../../../stores/user'

const store = useUserStore()
const currentPage = computed(() => store.currentPage)
const totalPages = computed(() => store.totalPages)

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    store.setPage(page)
  }
}

onMounted(() => store.fetchUsers())
</script>
<template>
  <CCard>
    <CCardHeader>
      <CRow class="d-flex align-items-center justify-content-end">
        <CCol xs="auto" class="d-flex align-items-center justify-content-end gap-2">
          <Tambahuser />
          <CButton color="success" @click="store.downloadPdf">
            <span class="text-light">Export</span> <CIcon :icon="cilFile" class="me-2 text-light" />
          </CButton>
        </CCol>
      </CRow>
    </CCardHeader>

    <CCardBody>
      <CTable id="my-table">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell scope="col">No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nama Lengkap</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">No Telp</CTableHeaderCell>
            <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <template v-if="store.loading">
            <CTableRow>
              <CTableDataCell colspan="4" class="d-flex align-items-center gap-2">
                <CSpinner color="secondary" class="text-sm" size="sm" />
                <span class="text-secondary">Loading...</span>
              </CTableDataCell>
            </CTableRow>
          </template>
          <template v-else-if="store.users.length < 1">
            <CTableRow>
              <CTableDataCell colspan="4" class="d-flex align-items-center gap-2">
                <span class="text-secondary">No Available data.</span>
              </CTableDataCell>
            </CTableRow>
          </template>
          <template v-else>
            <CTableRow v-for="(data, index) in store.paginatedData" :key="data._id">
              <CTableHeaderCell scope="row">{{
                (store.currentPage - 1) * store.perPage + index + 1
              }}</CTableHeaderCell>
              <CTableDataCell>{{ data.nama_lengkap }}</CTableDataCell>
              <CTableDataCell>{{ data.email }}</CTableDataCell>
              <CTableDataCell>{{ data.no_hp }}</CTableDataCell>
              <CTableDataCell class="w-25">{{ data.domisili }}</CTableDataCell>
              <CTableDataCell>
                <CRow>
                  <CCol sm="auto">
                    <Edituser :data="data._id" />
                  </CCol>
                  <CCol sm="auto">
                    <Detailuser :data="data._id" />
                  </CCol>
                  <CCol sm="auto">
                    <Hapususer :data="data" />
                  </CCol>
                </CRow>
              </CTableDataCell>
            </CTableRow>
          </template>
        </CTableBody>
      </CTable>

      <div class="d-flex justify-content-end">
        <CPagination aria-label="Page navigation example">
          <CPaginationItem
            aria-label="Previous"
            href="#"
            :disabled="currentPage === 1"
            @click.prevent="goToPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>

          <CPaginationItem
            v-for="page in totalPages"
            :key="page"
            :href="'#'"
            :active="currentPage === page"
            @click.prevent="goToPage(page)"
          >
            {{ page }}
          </CPaginationItem>
          <CPaginationItem
            aria-label="Next"
            href="#"
            :disabled="currentPage === totalPages"
            @click.prevent="goToPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </div>
    </CCardBody>
  </CCard>
</template>
