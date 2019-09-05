<template>
  <q-page>
    <div class="first-screen full-width q-pa-sm">
      <booking-card class="main-booking"/>
    </div>
    <div class="q-py-md">
      <h1 class="text-h5 q-px-md q-my-none" v-text="$t('meet_hutorok')"/>
      <div class="row">
        <router-link
          class="card-link"
          :to="{ name: 'thermal' }"
        >
          <q-card class="text-default">
            <q-img
              src="statics/pools.jpg"
              :alt="$t('pools_with_thermal_water')"
              basic
              :ratio="ratio"
            >
              <div
                class="absolute-bottom text-subtitle2"
                v-text="$t('pools_with_thermal_water')"
              />
            </q-img>
          </q-card>
        </router-link>

        <router-link
          class="card-link"
          :to="{ name: 'rooms' }"
        >
          <q-card class="text-default">
            <q-img
              src="statics/rooms.jpg"
              :alt="$t('cosy_houses_and_comfort_rooms')"
              basic
              :ratio="ratio"
            >
              <div
                class="absolute-bottom text-subtitle2"
                v-text="$t('cosy_houses_and_comfort_rooms')"
              />
            </q-img>
          </q-card>
        </router-link>

        <router-link
          class="card-link"
          :to="{ name: 'map' }"
        >
          <q-card class="text-default">
            <q-img
              src="statics/virtual.jpg"
              :alt="$t('virtual_walk')"
              basic
              :ratio="ratio"
            >
              <div
                class="absolute-bottom text-subtitle2"
                v-text="$t('virtual_walk')"
              />
            </q-img>
          </q-card>
        </router-link>
      </div>
    </div>
    <div class="q-py-md">
      <h1 class="text-h5 q-px-md q-my-none" v-text="$t('recommend_title')"/>
      <div class="row">
        <router-link
          v-for="s in services"
          :key="s.id"
          class="card-link"
          :to="{
            name: 'services',
            params: { id: s.id },
          }"
        >
          <q-card class="text-default">
            <q-img
              :src="s.main_image"
              basic
              :ratio="ratio"
            />
            <q-card-section class="text-subtitle2" v-text="s.title"/>
          </q-card>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import BookingCard from 'components/BookingCard.vue';
import { mapState } from 'vuex';

export default {
  name: 'Index',
  data() {
    return {
      ratio: 16 / 9,
    };
  },
  async mounted() {
    this.$store.dispatch('content/getServices');
  },
  computed: {
    ...mapState('content', ['services']),
  },
  components: {
    BookingCard,
  },
};
</script>

<style lang="stylus" scoped>
.first-screen
  height: 100vh
  min-height: 100vh
  position: relative
  background-image: url('/statics/hutorok.jpg')
  background-repeat: no-repeat
  background-position: center
  background-size: cover

.main-booking
  position: relative

@media (min-width: $sizes.sm)
  .main-booking
    left: 15%
    width: 390px
    top: 50%
    transform: translateY(-50%)
</style>
