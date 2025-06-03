<script setup>
import { onMounted, watch, ref, reactive, nextTick, computed } from 'vue';
import { CBadge, CModal, CModalBody, CModalHeader, CModalTitle, CSpinner } from '@coreui/vue';
import { useAbsensiStore } from '../../../stores/absensi';
import MapInit from '../../../components/MapInit.vue';

const store = useAbsensiStore();
const props = defineProps({
  data: {
    required: true,
  },
  visible: Boolean,
});

const coordinat = reactive({
  latitude: 0,
  longitude: 0,
  nama: '',
});

console.log(coordinat.nama);

const emit = defineEmits(['update:visible']);

watch(
  () => props.visible,
  async (val) => {
    if (val && props.data) {
      await store.fetchAbsensiById(props.data?._id);
      const detail = store.absensiDetail;
      console.log(detail);
      Object.assign(coordinat, {
        latitude: detail.latitude,
        longitude: detail.longitude,
        nama: detail.nama_lengkap,
      });
      await nextTick();
    }
  },
);
</script>

<template>
  <CModal :visible="props.visible" @close="emit('update:visible', false)" alignment="center">
    <CModalHeader>
      <CModalTitle> Lokasi terakhir: {{ props.data?.nama_lengkap || '...' }} </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <template v-if="store.loadingDetail">
        <div class="d-flex align-items-center gap-2">
          <CSpinner color="secondary" size="sm" />
          <span>Loading...</span>
        </div>
      </template>
      <template v-else>
        <CBadge color="danger" style="font-size: 14px; margin-bottom: 10px">
          Coordinat : {{ coordinat.latitude }}, {{ coordinat.longitude }}</CBadge
        >
        <MapInit
          :latitude="coordinat.latitude"
          :longitude="coordinat.longitude"
          :marker-label="coordinat.nama"
        />
      </template>
    </CModalBody>
  </CModal>
</template>
