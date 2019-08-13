<template>
  <q-page padding>
    <h1 class="text-h2" v-text="'Booking'"/>
  </q-page>
</template>

<script>
export default {
  name: 'Booking',
  props: {
    arrivalDate: String,
    departureDate: String,
    adultsCount: Number,
    childrenCount: Number,
  },
};
</script>
