<template>
  <q-page class="q-pa-md text-center">
    <h1 class="text-h2" v-text="$t('about')"/>
    <p class="text-body1 q-pa-sm">
    Краткое описание базы
    </p>
    <div id="map" style="width: 100%; height: 500px"></div>
    <p class="text-body1 text-weight-bold q-pa-sm">
    Контакты
    </p>

  </q-page>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>

</style>
