<template>
  <q-page class="flex flex-center">
    <recommend />
    <booking-card />
  </q-page>
</template>

<style>
</style>

<script>
import Recommend from 'components/Recommend.vue';
import BookingCard from 'components/BookingCard.vue';

export default {
  name: 'PageIndex',
  components: {
    Recommend,

    BookingCard,
  },
};
</script>
