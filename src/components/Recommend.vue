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
        <q-carousel-slide :name="index" v-for="(serviceItem, index) in allServices"
         :key="serviceItem.id">
          <router-link class="none-decor" :to="{name: 'service', params: {id: serviceItem.id}}">
            <div class="full-height full-width">
              <div><img src="../statics/adygeja.jpg"></div>
              <div class="text-h4 q-py-md">{{ serviceItem.name }}</div>
              <div class="text-body1 q-pb-xl">{{ serviceItem.description }}</div>
            </div>
          </router-link>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      slide: 0,
    };
  },
  name: 'Recommend',
  computed: {
    allServices() {
      return this.$store.state.content.services;
    },
  },
  async mounted() {
    this.$store.dispatch('content/getServices');
  },
};
</script>

<style>
.none-decor {
  text-decoration: none;
}
</style>
