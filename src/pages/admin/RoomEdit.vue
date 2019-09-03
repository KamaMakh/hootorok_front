<template>
  <q-page padding>
    {{ room }}
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RoomEdit',
  computed: {
    ...mapState('rooms', [
      'room',
    ]),
  },
  async mounted() {
    this.getRoom();
  },
  methods: {
    getRoom() {
      this.$store.dispatch('rooms/getRoom', this.$route.params.id);
    },
  },
};
</script>

<style scoped>

</style>
