<script setup>
import { onMounted, ref } from 'vue';
import { cilBarcode, cilFile, cilLocationPin } from '@coreui/icons';
import CIcon from '@coreui/icons-vue';
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
  CBadge,
} from '@coreui/vue';
import { computed } from 'vue';
import { useAbsensiStore } from '../../../stores/absensi';
import Detailabsensi from './detailabsensi.vue';
import { DateFormat, TimeFormat } from '../../../utils/date';
import Mapabsensi from './mapabsensi.vue';
import HapusAbsensi from './hapusabsensi';

const store = useAbsensiStore();
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);

const selectedMapData = ref(null);
const mapVisible = ref(false);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    store.setPage(page);
  }
};
function handleSelectChange(event) {
  store.setSelected(event.target.value);
}

const openMapModal = (data) => {
  selectedMapData.value = data;
  mapVisible.value = true;
};

onMounted(() => store.fetchAbsensi());
</script>
<template>
  <Mapabsensi :data="selectedMapData" v-model:visible="mapVisible" />

  <CCard>
    <CCardHeader>
      <CRow class="d-flex align-items-center justify-content-between">
        <CCol xs="auto" class="d-flex align-items-center justify-content-center">
          <CFormSelect
            aria-label="Large select example"
            :value="store.selected"
            @change="handleSelectChange"
          >
            <option value="All">Semua Lokasi</option>
            <option value="UNAS Pejaten">UNAS Pejaten</option>
            <option value="UNAS Ragunan">UNAS Ragunan</option>
            <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
          </CFormSelect>
        </CCol>
        <CCol xs="auto" class="d-flex align-items-center justify-content-end gap-2">
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
            <CTableHeaderCell scope="col">Petugas</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lokasi Absen</CTableHeaderCell>
            <CTableHeaderCell scope="col">Koordinat</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tanggal Absen</CTableHeaderCell>
            <CTableHeaderCell scope="col">Check In - Out</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Jam</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <template v-if="store.loading">
            <CTableRow>
              <CTableDataCell
                colspan="8"
                class="text-center"
                style="width: 100%; display: table-cell"
              >
                <CSpinner color="secondary" class="text-sm" size="sm" />
                <span class="text-secondary"> Loading...</span>
              </CTableDataCell>
            </CTableRow>
          </template>
          <template v-else-if="store.absensiData.length < 1">
            <CTableRow>
              <CTableDataCell
                colspan="8"
                class="text-center"
                style="width: 100%; display: table-cell"
              >
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
              <CTableDataCell>{{ data.lokasi_absen }}</CTableDataCell>
              <CTableDataCell
                ><CTableDataCell>
                  <CButton color="warning" variant="outline" @click="openMapModal(data)" size="sm">
                    <CIcon :icon="cilLocationPin" class="text-warning" />
                  </CButton>
                </CTableDataCell>
              </CTableDataCell>
              <CTableDataCell>{{ DateFormat(data.createdAt) }}</CTableDataCell>

              <CTableDataCell
                ><CBadge color="success">{{ TimeFormat(data.checkInTime) }}</CBadge> -
                <CBadge color="danger">{{ TimeFormat(data.checkOutTime) }}</CBadge></CTableDataCell
              >
              <CTableDataCell>{{ data.total_jam_kerja }}</CTableDataCell>
              <CTableDataCell>
                <CRow>
                  <!-- <CCol sm="auto">
                    <Detailabsensi :data="data._id" />
                  </CCol> -->
                  <CCol sm="auto">
                    <HapusAbsensi :data="data._id" />
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
