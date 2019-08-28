<template>
  <q-page padding>
    <h1 class="text-h2 text-center" v-text="$t('housing_facilities')"/>
    <div class="row">
      <q-card class="text-default q-my-md" v-for="(housing,i) in housings" :key="housing.id">
        <router-link :to="{ name: 'rooms' }" class="card-link text-h4 text-default q-py-md">
          Заголовок
        </router-link>
        <q-carousel
          v-model="housingsSlides[i]"
          animated
          arrows
          navigation
          infinite
          :fullscreen.sync="housingsFullscreens[i]"
        >
          <q-carousel-slide
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
        <p class="text-body1 q-pa-md" v-text="housing.description"  />
      </q-card>
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
</style>
