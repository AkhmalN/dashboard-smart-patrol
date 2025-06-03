<template>
  <div ref="mapRef" :style="mapStyle"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, nextTick, computed } from 'vue';

const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  zoom: {
    type: Number,
    default: 13,
  },
  markerLabel: {
    type: String,
    default: 'Location',
  },
  height: {
    type: String,
    default: '300px',
  },
  width: {
    type: String,
    default: '100%',
  },
});

const mapRef = ref(null);
let mapInstance = null;
let marker = null;

const mapStyle = computed(() => ({
  height: props.height,
  width: props.width,
}));

const initMap = () => {
  const L = window.L;
  if (!L || !mapRef.value) return;

  if (mapInstance) {
    mapInstance.remove();
  }

  mapInstance = L.map(mapRef.value).setView([props.latitude, props.longitude], props.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

  marker = L.marker([props.latitude, props.longitude])
    .addTo(mapInstance)
    .bindPopup(props.markerLabel)
    .openPopup();

  // force resize after render
  setTimeout(() => {
    mapInstance.invalidateSize();
  }, 100);
};

onMounted(async () => {
  await nextTick();
  initMap();
});

watch(
  () => [props.latitude, props.longitude, props.markerLabel],
  () => {
    if (mapInstance) {
      mapInstance.setView([props.latitude, props.longitude], props.zoom);
      marker.setLatLng([props.latitude, props.longitude]);

      if (marker.getPopup()) {
        marker.setPopupContent(props.markerLabel);
      } else {
        marker.bindPopup(props.markerLabel).openPopup();
      }
    } else {
      initMap();
    }
  },
);

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<style scoped>
/* Optional: set container styles */
</style>
