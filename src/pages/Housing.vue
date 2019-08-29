<template>
  <q-page class="housing">
    <h1 class="housing__title text-center" v-text="$t('housing_facilities')"/>
    <div class="row">
      <div class="q-mb-md housing__card" v-for="(housing,i) in housings" :key="housing.id">
        <router-link :to="{ name: 'rooms' }" class="housing__link">
          Заголовок
        </router-link>
        <q-carousel
          v-model="housingsSlides[i]"
          class="housing__carousel"
          animated
          navigation
          height="60vh"
          transition-prev="slide-right"
          transition-next="slide-left"
          infinite
          :fullscreen.sync="housingsFullscreens[i]"
        >
          <q-carousel-slide
            class="housing__slide"
            :name="index"
            v-for='(img,index) in housing.photos'
            :key="index"
            :img-src="img"
          />
          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push round dense color="white" text-color="primary"
                :icon="housingsFullscreens[i] ? 'fullscreen_exit' : 'fullscreen'"
                @click="changeFullscreen(i)"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
        <p class="housing__description" v-text="housing.description"  />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'housing',
  data() {
    return {
      housingsSlides: [],
      housingsFullscreens: [],
      fullscreen: false,
    };
  },
  computed: {
    ...mapState('content', ['housings']),
  },
  methods: {
    changeFullscreen(index) {
      this.$set(this.housingsFullscreens, index, !this.housingsFullscreens[index]);
    },
  },
  async mounted() {
    this.$store.dispatch('content/getAllHousings').then(() => {
      this.housingsSlides = Array.from({ length: this.housings.length }, () => 0);
      this.housingsFullscreens = Array.from({ length: this.housings.length }, () => false);
    });
  },
};
</script>

<style scoped lang='stylus'>
.card-link
  text-decoration none
  display block
  text-align center
.housing
  &__title
    font-size: 28px
    margin 0
    margin-bottom 17px
  &__card
    width 100%
  &__link
    font-size 20px
    text-decoration none
    text-align center
    display block
    margin-bottom 15px
    color: $text_default
  &__carousel
    width: 100vw
    margin-bottom 17px
  &__description
    font-size: 14px
</style>
