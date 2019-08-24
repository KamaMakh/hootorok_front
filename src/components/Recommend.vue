<template>
  <div class="q-px-md text-center">
    <h1 class="text-h3" v-text="$t('recommend_title')"/>
    <div class="row justify-center">
      <q-carousel
        class="rounded-borders col-sm-12"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        :autoplay="2500"
        arrows
        infinite
        navigation
        height="auto"
      >
        <q-carousel-slide class="q-pa-none"
          :name="index" v-for="(serviceItem, index) in allServices"
          :key="serviceItem.id">
          <router-link class="none-decor" :to="{name: 'services', params: {id: serviceItem.id}}">
              <div><img  class="full-width" src="../statics/adygeja.jpg"></div>
              <div class="text-h4 q-py-md">{{ serviceItem.name }}</div>
              <div class="text-body1 q-pb-xl">{{ serviceItem.description }}</div>
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
.q-carousel__control.q-btn {
  top: 42%;
}
.none-decor {
  text-decoration: none;
}
</style>
