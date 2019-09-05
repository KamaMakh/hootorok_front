<template>
  <q-page padding class="text-center">
   <!-- <template v-if="isServiceEmpty">
      {{ $t('news_not_found') }}
    </template>-->
    <!--<template v-else>-->
      <router-link
        class="services-link"
        to="/services"
      >
        <h1
          class="text-h6 text-left"
          v-text="$t('list_of_services')"
        />
      </router-link>
     <!-- <h1 class="text-h2">{{$t('service')}} {{this.$attrs.id}} </h1>-->
    <div
      class="q-my-sm text-h2"
      v-text="currentPage.title"
    />
      <div
        class="q-my-sm text-default"
        v-text="currentPage.description"
      />
    <q-carousel
      v-model="slide"
      animated
      swipeable
      control-color="white"
      navigation
      infinite
      arrows
      class="text-white full-width"
      height="50vw"
    >
      <q-carousel-slide
        v-for="(img, i) in currentPage.content_images"
        :key="i"
        :img-src="img"
        :name="i"
      />
    </q-carousel>
   <!-- </template>-->

  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ServiceItem',
  preFetch({ store, currentRoute }) {
    return store.dispatch('content/getOnePage', currentRoute.params.id);
  },
  data() {
    return {
      slide: 0,
    };
  },
  computed: {
    ...mapState('content', ['pages']),
    currentPage() {
      return this.pages[this.$attrs.id];
    },
    isServiceEmpty() {
      return Object.keys(this.oneService).length === 0;
    },
  },
};
</script>


<style scoped>

</style>
