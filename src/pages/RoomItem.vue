<template>
  <q-page padding>
    <div>
      <router-link :to="{name: 'rooms'}">
        <q-btn color="primary">
          <q-icon left size="1em" name="navigate_before" />
          <div>Rooms list</div>
        </q-btn>
      </router-link>
      <h4 class="text-h4 text-center">{{$t('room_number')}} {{this.$attrs.id}}</h4>
    </div>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-carousel
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide
              v-for="item in roomFoto"
              :key="item.id"
              :name="item.id"
              :img-src="item.src"/>
          </q-carousel>
          <br>
          <div class="text-body1">
            {{this.oneRoom[0].description}}
          </div>
        </div>
        <div class="col q-ma-md">
          <app-booking-card/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import BookingCard from '../components/BookingCard';

export default {
  name: 'RoomItem',
  data() {
    return {
      slide: 1,
      icon: false,
      roomFoto: [
        {
          id: 1,
          src: 'https://cdn.quasar.dev/img/mountains.jpg',
        },
        {
          id: 2,
          src: 'https://cdn.quasar.dev/img/parallax1.jpg',
        },
        {
          id: 3,
          src: 'https://cdn.quasar.dev/img/mountains.jpg',
        },
        {
          id: 4,
          src: 'https://cdn.quasar.dev/img/parallax1.jpg',
        },
      ],
    };
  },
  created() {
    this.$store.dispatch('room/fetchOneRoom', this.$attrs.id);
  },
  computed: {
    ...mapState('room', ['oneRoom']),
  },
  methods: {},
  components: {
    appBookingCard: BookingCard,
  },
};
</script>

<style scoped>

</style>
