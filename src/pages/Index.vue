<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <BookingCard />
  </q-page>
</template>

<style>
</style>

<script>
import BookingCard from '../components/BookingCard.vue';

export default {
  name: 'PageIndex',
  components: {
    BookingCard,
  },
};
</script>
