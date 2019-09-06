<template>
  <q-page padding class="text-center">
    <router-link
      class="services-link"
      :to="{ name: 'services' }"
    >
      <h1
        class="text-h6 text-left"
        v-text="$t('list_of_services')"
      />
    </router-link>
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
  },
};
</script>
