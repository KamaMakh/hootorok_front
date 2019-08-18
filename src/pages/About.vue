<template>
  <q-page padding class="q-ma-md text-center">
    <h1 class="text-h2" v-text="$t('about')"/>
    <p class="text-body1 q-pb-md">
      {{ aboutInfo.description }}
    </p>
      <ya-map />
    <p class="text-body1 text-weight-bold q-pt-md">
      {{ "Телефон: " + aboutInfo.phone }} <br>
      {{ "E-mail: " + aboutInfo.email }} <br>
      {{ "Адрес: " + aboutInfo.address.street + ' : ' + aboutInfo.address.suite  }}
    </p>

  </q-page>
</template>

<script>
import YaMap from 'components/YaMap.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'About',
  components: {
    YaMap,
  },
  computed: mapGetters('content', ['aboutInfo']),
  methods: mapActions('content', ['getAboutInfo']),
  async mounted() {
    this.getAboutInfo();
  },
};
</script>

<style scoped>

</style>
