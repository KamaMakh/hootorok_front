<template>
  <q-page>
    <div class="first-screen full-width q-pa-sm">
      <booking-card class="main-booking"/>
    </div>
    <div class="q-py-md">
      <h1 class="text-h5 q-px-md q-my-none" v-text="$t('recommend_title')"/>
      <div class="row">
        <router-link
          v-for="s in services"
          :key="s.id"
          class="service-link"
          :to="{
            name: 'services',
            params: { id: s.id },
          }"
        >
          <q-card class="text-default">
            <q-img
              :src="s.main_image"
              basic
              :ratio="16/9"
            />
            <q-card-section v-text="s.title"/>
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
      slide: 0,
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

.service-link
  width: "calc((100% - 4 * %s) / 3)" % (2 * $spaces.sm.x)
  margin-left: $spaces.md.x
  margin-top: $spaces.md.y
  text-decoration: none;

@media (max-width: $sizes.md)
  .service-link
    width: "calc((100% - 3 * %s) / 2)" % (2 * $spaces.sm.x)

@media (max-width: $sizes.sm)
  .service-link
    width: "calc(100% - 2 * %s)" % (2 * $spaces.sm.x)
</style>
