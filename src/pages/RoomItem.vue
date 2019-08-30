<template>
  <q-page padding>
    <h1 class="text-h5">{{$t('room_number')}} {{this.$attrs.id}}</h1>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          .col
        </div>
        <div class="col">
          <app-booking-card />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import BookingCard from '../components/BookingCard';

export default {
  name: 'RoomItem',
  data() {
    return {};
  },
  methods: {},
  components: {
    appBookingCard: BookingCard,
  },
};
</script>

<style scoped>

</style>
