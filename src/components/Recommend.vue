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
        <q-carousel-slide :name="service.id"
        v-for="service in allServices" :key="service.id">
          <router-link class="none-decor" :to="'/services/' + service.id">
            <div class="full-height full-width">
              <div><img src="../statics/adygeja.jpg"></div>
              <div class="text-h4 q-py-md">{{ service.name }}</div>
              <div class="text-body1 q-pb-lg">{{ service.description }}</div>
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
  computed: mapGetters('content', ['allServices']),
  methods: mapActions('content', ['getServices']),
  async mounted() {
    this.getServices();
  },
  updated() {
    if (Number.isNaN(Number(this.slide))) this.slide = this.allServices[0].id;
  },
};
</script>

<style>
.none-decor {
  text-decoration: none;
}
</style>
