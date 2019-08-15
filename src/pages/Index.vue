<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <info-hutorok/>
  </q-page>
</template>

<style>
</style>

<script>
  import InfoHutorok from '../components/InfoAboutHutorok.vue';
export default {
  name: 'PageIndex',
  components: {
    InfoHutorok,
  },
};
</script>
