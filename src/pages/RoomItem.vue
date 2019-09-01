<template>
  <q-page padding>
    <div>
      <router-link :to="{ name: 'rooms' }">
        <q-btn color="primary">
          <q-icon left size="1em" name="navigate_before"/>
          <div v-text="$t('all_rooms')"/>
        </q-btn>
      </router-link>
      <h4
        class="text-h4 text-center"
        v-text="`${$t('room_number')} ${this.$attrs.id}`"
      />
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
          <div
            class="text-body1"
            v-text="this.room.description"
          />
        </div>
        <div class="col q-ma-md">
          <booking-card/>
        </div>
      </div>
    </div>
    <q-dialog
      full-width
      full-height
      v-model="showDialog"
    >
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
            <q-btn
              flat
              @click="showDialog = false"
              color="white"
              icon="clear"
            />
          </q-carousel-slide>
        </q-carousel>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import BookingCard from 'components/BookingCard.vue';

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
  async mounted() {
    this.$store.dispatch('rooms/getRoom', this.$attrs.id);
  },
  computed: {
    ...mapState('rooms', ['room']),
  },
  methods: {},
  components: {
    BookingCard,
  },
};
</script>
