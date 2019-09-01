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
              :img-src="item.src"
              @click="showDialog = true"
            />
          </q-carousel>
          <br>
          <div class="text-body1">
            {{this.oneRoom[0].description}}
          </div>
        </div>
        <div class="col q-ma-md">
          <booking-card/>
        </div>
      </div>
    </div>
    <q-dialog v-model="showDialog" full-width full-height>
        <q-carousel
          swipeable
          animated
          v-model="newSlide"
          thumbnails
          infinite
        >
          <q-carousel-slide
            v-for="item in roomFoto"
            :key="item.id"
            :name="item.id"
            :img-src="item.src"
          >
            <q-btn flat @click="showDialog = false"><q-icon name="clear"></q-icon></q-btn>
          </q-carousel-slide>
        </q-carousel>
    </q-dialog>
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
      newSlide: 1,
      showDialog: false,
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
    BookingCard,
  },
};
</script>
