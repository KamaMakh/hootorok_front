<template>
  <q-page class="flex flex-center">
    <booking-card />
  </q-page>
</template>

<style>
</style>

<script>
import BookingCard from 'components/BookingCard.vue';

export default {
  name: 'PageIndex',
  components: {
    BookingCard,
  },
};
</script>
