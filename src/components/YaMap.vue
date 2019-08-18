<template>
  <div class="flex-block column justify-center" id="yandex-map"></div>
</template>

<script>
export default {
  data() {
    return {
      name: 'YaMap',
      map: null,
      coordinates: [52.44, 69.73],
    };
  },
  mounted() {
    this.initializeYandexMap();
  },
  methods: {
    initializeYandexMap() {
      // eslint-disable-next-line
      ymaps.ready(() => {
        // eslint-disable-next-line
        this.map = new ymaps.Map('yandex-map', {
          center: [60.00, 30.00],
          zoom: 10,
          controls: ['fullscreenControl'],
        });
        // eslint-disable-next-line
        let myPlacemark = new ymaps.Placemark([60.00, 30.00], {
          balloonContent: '<strong>База отдыха "Хуторок"</strong>',
        });

        this.map.geoObjects
          .add(myPlacemark);
        this.map.controls.remove('searchControl');
      });
    },
  },
};
</script>

<style scoped>
#yandex-map {
  width: 100%;
  height: 600px;
}
</style>
