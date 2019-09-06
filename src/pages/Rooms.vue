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
      <!-- <q-btn-toggle
        v-model="view"
        size="sm"
        push
        glossy
        toggle-color="primary"
        :options="[
          { value: 'one', slot: 'one'},
          { value: 'two', slot: 'two'},
        ]"
      >
        <template v-slot:one>
          <q-icon name="view_module"/>
        </template>
        <template v-slot:two>
          <q-icon name="view_headline"/>
        </template>
      </q-btn-toggle> -->
    </div>
    <div
      v-if="view === 'one'"
      class="row items-start q-pb-md"
    >
      <q-card
        v-for="item in roomsPaged"
        :key="item.id"
        flat
        square
        class="card-link"
      >
        <router-link
          class="text-h6 q-py-sm block standard-link text-default"
          :to="{
            name: 'room',
            params: { id: item.id },
          }"
          v-text="`${$t('room_number')} ${item.id}`"
        />
        <q-img
          basic
          :src="item.main_image"
          :ratio="16/9"
          @click="showPhotos(item)"
          class="cursor-pointer"
        >
          <q-tooltip>{{ $t('see_all_room_photos') }}</q-tooltip>
        </q-img>
        <q-separator class="q-my-sm"/>
        <div class="row justify-between text-body2 text-bold">
          <div v-text="`${item.price} ${$t('rur/night')}`"/>
          <div v-text="`${item.capacity} ${$t('man')}`"/>
        </div>
        <div class="row no-wrap q-mt-md items-center justify-between">
          <div class="text-body2" v-text="item.description"/>
          <q-btn
            flat
            color="grey"
            class="justify-center items-center"
            :to="{
              name: 'room',
              params: { id: item.id },
            }"
          >
            <q-icon name="arrow_forward_ios" style="font-size: 14px;"/>
          </q-btn>
        </div>
      </q-card>
    </div>
    <div
      v-if="view === 'two'"
      class="q-pa-md"
    >
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left" v-text="$t('photo')"/>
            <th class="text-right" v-text="$t('room_number')"/>
            <th class="text-right" v-text="$t('housing')"/>
            <th class="text-right" v-text="$t('price_per_day')"/>
            <th class="text-right" v-text="$t('number_of_adults_and_children')"/>
          </tr>
        </thead>
        <tbody>
          <tr>
          <tr v-for="item in roomsPaged" :key="item.id">
            <td class="text-left">
              <img
                :src="item.main_image"
                class="small-image"
                @click="showPhotos(item)"
              >
            </td>
            <td
              class="text-right"
              @click="$router.push({
                name: 'room',
                params: { id: item.id },
              })"
              v-text="item.id"
            />
            <td
              class="text-right"
              @click="$router.push({ name: 'housings' })"
              v-text="item.housing"
            />
            <td class="text-right" v-text="item.price"/>
            <td class="text-right" v-text="item.capacity"/>
          </tr>
        </tbody>
      </q-markup-table>
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
          animated
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

const perPageOptions = [6, 12, 18];

export default {
  name: 'Rooms',
  data() {
    return {
      isDesc: true,
      view: 'one',
      housing: this.$route.params.housing || 0,
      showCarousel: false,
      slide: 1,
      perPage: perPageOptions[0],
      perPageOptions,
      currentPage: 1,
      photos: [],
    };
  },
  async mounted() {
    this.$store.dispatch('rooms/getHousings');
    this.$store.dispatch('rooms/getRooms');
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
    showPhotos(room) {
      this.photos = [...room.content_images];
      this.slide = 1;

      this.showCarousel = true;
    },
    resetCurrentPage() {
      this.currentPage = 1;
    },
  },
};
</script>

<style lang="stylus" scoped>
.small-image
  width: 120px
  height: 75px
</style>
