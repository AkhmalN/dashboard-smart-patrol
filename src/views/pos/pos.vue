<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePosStore } from '../../stores/pos'
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
import Tambahpos from './tambahpos.vue'
import Hapuspos from './hapuspos.vue'
import Qrcode from './qrcode.vue'

const store = usePosStore()
const currentPage = computed(() => store.currentPage)
const totalPages = computed(() => store.totalPages)

function handleSelectChange(event) {
  store.setSelected(event.target.value)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    store.setPage(page)
  }
}

onMounted(() => store.fetchPos())
</script>

<template>
  <CCard class="">
    <CCardHeader>
      <CRow class="d-flex align-items-center justify-content-between">
        <CCol xs="auto" class="d-flex align-items-center justify-content-center">
          <CFormSelect
            aria-label="Large select example"
            :value="store.selected"
            @change="handleSelectChange"
          >
            <option value="All">Semua Instansi</option>
            <option value="UNAS Pejaten">UNAS Pejaten</option>
            <option value="UNAS Ragunan">UNAS Ragunan</option>
            <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
          </CFormSelect>
        </CCol>

        <CCol xs="auto" class="d-flex align-items-center justify-content-end gap-2">
          <Tambahpos />
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
            <CTableHeaderCell scope="col">Nama Instansi</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lokasi Barcode</CTableHeaderCell>
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

          <template v-else>
            <CTableRow v-for="(data, index) in store.paginatedData" :key="data._id">
              <CTableHeaderCell scope="row">{{
                (store.currentPage - 1) * store.perPage + index + 1
              }}</CTableHeaderCell>
              <CTableDataCell>{{ data.nama_instansi }}</CTableDataCell>
              <CTableDataCell>{{ data.lokasi_barcode }}</CTableDataCell>
              <CTableDataCell>
                <CRow>
                  <CCol sm="auto">
                    <Hapuspos :data="data" />
                  </CCol>
                  <CCol sm="auto">
                    <Qrcode :data="data" />
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
