<template>
  <q-page padding>
    {{ oneNews }}
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NewsEdit',
  computed: {
    ...mapState('content', [
      'oneNews',
    ]),
  },
  async mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.$store.dispatch('content/getOneNews', this.$route.params.id);
    },
  },
};
</script>

<style>
</style>
