<template>
  <q-page class="text-center">
    <h1
      class="text-h5"
      v-text="$t('recreation_center_hutorok')"
    />
    <div
      class="text-justify text-grey-7 text-body2 q-px-md about-content"
      v-text="onePage.content"
    />

    <ya-map
      class="q-px-md q-mt-md ya-map"
      :coords="coords"
    />

    <q-carousel
      v-model="slide"
      transition-next="slide-left"
      transition-prev="slide-right"
      animated
      thumbnails
      swipeable
      control-color="white"
      infinite
      padding
      class="full-width q-mt-md"
      height="100vh"
    >
      <q-carousel-slide
        v-for="(img, index) in onePage.content_images"
        :key="index"
        :img-src="img"
        :name="index"
      />
    </q-carousel>

    <div class="q-py-lg text-body2">
      {{ $t('phone_for_information') }}: <a
        class="standard-link text-primary"
        :href="`tel:+${mainTelephone}`"
        v-text="`+${mainTelephone}`"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import YaMap from 'components/YaMap';

export default {
  preFetch({ store }) {
    return store.dispatch('content/getOnePage', 'about_rest');
  },
  name: 'About',
  components: { YaMap },
  data() {
    return {
      slide: 0,
    };
  },
  computed: {
    ...mapState({
      onePage: state => state.content.pages.about_rest,
      mainTelephone: 'mainTelephone',
      coords: 'coords',
    }),
  },
};
</script>

<style lang="stylus" scoped>
.ya-map
  height 80vh

.about-content
  max-width: 780px
  margin: auto
</style>
