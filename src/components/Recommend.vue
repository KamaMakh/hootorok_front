<template>
  <div class="q-pa-md text-center full-width">
    <h1 class="text-h3" v-text="$t('recommend_title')"/>
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
        :autoplay="2500"
        arrows
        infinite
        navigation
        height="auto"
      >
        <q-carousel-slide :name="item.id"
        v-for="item in allServices" :key="item.id">
          <router-link :to="'/services/' + item.id">
            <div class="full-height full-width">
              <div><img :src="item.url"></div>
              <div class="text-h4 q-py-md">{{ item.title }}</div>
              <div class="text-body1 q-pb-lg">{{ item.description }}</div>
            </div>
          </router-link>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      slide: NaN,
    };
  },
  name: 'Recommend',
  computed: mapGetters('service', ['allServices']),
  methods: mapActions('service', ['getServices']),
  async mounted() {
    this.getServices();
  },
  updated() {
    // eslint-disable-next-line
    if (isNaN(this.slide)) this.slide = this.allServices[0].id;
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
