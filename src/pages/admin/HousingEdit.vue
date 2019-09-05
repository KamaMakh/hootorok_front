<template>
  <q-page padding>
    {{ housing }}
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HousingEdit',
  computed: {
    ...mapState('rooms', [
      'housing',
    ]),
  },
  async mounted() {
    this.getHousing();
  },
  methods: {
    getHousing() {
      this.$store.dispatch('rooms/getHousing', this.$route.params.id);
    },
  },
};
</script>
