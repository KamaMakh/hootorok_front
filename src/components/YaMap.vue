<template>
  <yandex-map
    v-if="showMap"
    :coords="coords"
    :settings="settings"
    :zoom="zoom"
    :controls="controls"
    :options="options"
  >
    <ymap-marker
      :coords="coords"
      marker-id="1"
    />
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
  name: 'YaMap',
  components: { yandexMap, ymapMarker },
  props: {
    coords: Array,
  },
  mounted() {
    this.showMap = true;
  },
  data: () => ({
    showMap: false,
    zoom: 10,
    settings: {
      apiKey: 'bff47474-50d8-4300-80b7-d342d8cfc443',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1',
    },
    options: {
      autoFitToViewport: 'always',
    },
    controls: [
      'geolocationControl',
      'zoomControl',
    ],
  }),
};
</script>

<style scoped>
.ymap-container {
  height: 500px;
}
</style>
