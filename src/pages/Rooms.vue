<template>
  <q-page>
    <h1
      class="text-h2 text-center"
      v-text="$t('rooms_and_houses')"
    />
    <div class="row justify-center">
      <div class="row no-wrap items-center">
        <span v-text="$t('sort_by')"/>
        <q-select
          dense
          emit-value
          map-options
          options-dense
          v-model="isDesc"
          :options="sortOptions"
          class="q-mx-md"
        />
      </div>
      <div class="row no-wrap items-center">
        <span v-text="$t('show_rooms')"/>
        <q-select
          dense
          emit-value
          map-options
          options-dense
          v-model="housing"
          :options="housingsOptions"
          class="q-mx-md"
          @input="resetCurrentPage"
        />
      </div>
      <div class="row no-wrap items-center">
        <span v-text="$t('display_by')"/>
        <q-select
          dense
          options-dense
          v-model="perPage"
          :options="perPageOptions"
          class="q-mx-md"
          @input="resetCurrentPage"
        />
      </div>
    </div>
    <div class="row items-start q-pb-md">
      <room-card
        v-for="room in roomsPaged"
        :key="room.id"
        :room="room"
        @show-photos="showPhotos"
      />
    </div>
    <div v-if="pages > 1" class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="pages"
        :direction-links="true"
      />
    </div>
    <q-dialog
      v-model="showCarousel"
      maximized
      class="relative"
    >
      <div class="full-width full-height">
        <q-carousel
          v-model="slide"
          arrows
          navigation
          infinite
          class="full-height full-width"
        >
          <q-carousel-slide
            v-for="(image, index) in photos"
            :img-src="image"
            :key="index"
            :name="index + 1"
          />
        </q-carousel>
        <q-btn
          flat
          icon="close"
          class="absolute-top-right"
          color="white"
          style="z-index: 10000;"
          @click="showCarousel = false"
        />
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import RoomCard from 'components/RoomCard.vue';

const perPageOptions = [6, 12, 18];

export default {
  name: 'Rooms',
  preFetch({ store }) {
    return Promise.all([
      store.dispatch('rooms/getHousings'),
      store.dispatch('rooms/getRooms'),
    ]);
  },
  data() {
    return {
      isDesc: true,
      housing: this.$route.params.housing || 0,
      showCarousel: false,
      slide: 1,
      perPage: perPageOptions[0],
      perPageOptions,
      currentPage: 1,
      photos: [],
    };
  },
  computed: {
    ...mapState('rooms', ['rooms', 'housings']),
    pages() {
      return Math.ceil(this.roomsFiltered.length / this.perPage);
    },
    sortOptions() {
      return [
        {
          label: this.$t('decrease_price_by'),
          value: true,
        }, {
          label: this.$t('increase_price_by'),
          value: false,
        },
      ];
    },
    housingsOptions() {
      const housingsSelection = this.housings
        .map(i => ({
          label: `${this.$t('housing')} ${i.id}`,
          value: i.id,
        }));

      return [
        {
          label: this.$t('of_all_housings'),
          value: 0,
        },
        ...housingsSelection,
      ];
    },
    roomsFiltered() {
      const res = this.housing === 0
        ? [...this.rooms]
        : this.rooms.filter(r => r.housing === this.housing);

      if (this.isDesc) {
        res.sort((a, b) => b.price - a.price);
      } else {
        res.sort((a, b) => a.price - b.price);
      }

      return res;
    },
    roomsPaged() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      return this.roomsFiltered.slice(start, end);
    },
  },
  methods: {
    showPhotos(photos) {
      this.photos = photos;
      this.slide = 1;

      this.showCarousel = true;
    },
    resetCurrentPage() {
      this.currentPage = 1;
    },
  },
  components: {
    RoomCard,
  },
};
</script>
