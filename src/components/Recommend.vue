<template>
<div>
  <h1 class="text-h3" v-text="$t('recommend_title')"/>
  <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
        :autoplay="5000"
        arrows
        infinite
        swipeable
        navigation

      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            <q-card class="my-card">
              <img src="https://cdn.quasar.dev/img/mountains.jpg">

              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>

              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
</div>
</template>

<script>

export default {
  name: 'Recommend',
  data() {
    return {
      slide: 'style',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?',
    };
  },
  methods: {},
};
</script>

<style scoped>

</style>
