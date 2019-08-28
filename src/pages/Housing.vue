<template>
  <q-page padding>
    <h1 class="text-h2" v-text="$t('housing_facilities')"/>
    <div class="row">
      <q-card class="text-default" v-for="housing in housings" :key="housing.id">
        <router-link :to="{ name: 'rooms' }" class="card-link text-h4 text-default">
          Заголовок
        </router-link>
        <q-carousel
          v-model="slide"
          animated
          arrows
          navigation
          infinite
          :fullscreen.sync="fullscreen"
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
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
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
      slide: 0,
      fullscreen: false,
    };
  },
  computed: {
    ...mapState('content', ['housings']),
  },
  async mounted() {
    this.$store.dispatch('content/getAllHousings');
  },
};
</script>

<style scoped lang='stylus'>
.card-link
  text-decoration none
  text-align center
</style>
