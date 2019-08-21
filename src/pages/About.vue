<template>
  <q-page padding class="q-ma-md text-center">
    <h1 class="text-h2" v-text="$t('about')"/>
    <p class="text-body1 q-pb-md">
      {{ aboutInfo.description }}
    </p>
      <yandex-map :coords="coords" :settings="settings"
                  :zoom="zoom" :controls="controls">
        <ymap-marker :coords="coords"></ymap-marker>
      </yandex-map>
    <p class="text-body1 text-weight-bold q-pt-md">
      {{ "Телефон: " + aboutInfo.phone }} <br>
      {{ "E-mail: " + aboutInfo.email }} <br>
      {{ "Адрес: " + aboutInfo.address.street + ' : ' + aboutInfo.address.suite  }}
    </p>

  </q-page>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
  name: 'About',
  components: { yandexMap, ymapMarker },
  data: () => ({
    zoom: 10,
    coords: [60, 30],
    settings: {
      apiKey: 'bff47474-50d8-4300-80b7-d342d8cfc443',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1',
    },
    controls: [
      'fullscreenControl',
      'geolocationControl',
      'routeEditor',
      'rulerControl',
      'trafficControl',
      'typeSelector',
      'zoomControl',
      'routeButtonControl',
    ],
  }),
  computed: {
    aboutInfo() {
      return this.$store.state.content.aboutInfo;
    },
  },
  async mounted() {
    this.$store.dispatch('content/getAboutInfo');
  },
};
</script>

<style scoped>
.ymap-container {
  height: 600px;
}
</style>
