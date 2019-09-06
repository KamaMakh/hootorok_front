<template>
  <q-page>
    <div
      class="q-pb-xl window-height row justify-center"
      :style="{ background: `url(${page.main_image})` }"
      style="background: no-repeat; background-size: cover;"
    >
      <div
        class="window-height full-width absolute-top-left"
        style="background: rgba(0, 0, 0, 0.3);"
      />
      <div class="q-pa-md absolute-top-left" style="z-index: 1">
        <router-link
          class="standard-link text-white"
          :to="{ name: 'services' }"
          v-text="`< ${$t('list_of_services')}`"
        />
      </div>
      <div class="relative-position q-pt-xl full-width text-white">
        <div
          class="text-center q-ma-md text-h4"
          v-text="page.title"
        />
        <div
          class="text-body2 q-pt-lg text-center"
          style="width: 80%; margin: auto;"
          v-text="page.description"
        />
      </div>
    </div>
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
        v-for="(img, i) in page.content_images"
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
  name: 'Service',
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
    page() {
      return this.pages[this.$attrs.id];
    },
  },
};
</script>
