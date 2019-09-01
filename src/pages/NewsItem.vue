<template>
  <q-page padding>
    <div>
      {{ oneNews }}
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'news',
  data() {
    return {};
  },
  async mounted() {
    this.$store.dispatch('content/getOneNews', this.$attrs.id);
  },
  computed: {
    ...mapState('content', ['oneNews']),
  },
  methods: {
  },
};
</script>
