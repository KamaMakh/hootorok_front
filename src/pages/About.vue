<template>
  <q-page class="text-center">
    <div
    class="q-pa-xl about-content">

      <div
      class="text-h4 q-py-md about-title"
      v-text="$t('about_title')"
      />

      <div
        class="text-justify text-grey-7 text-body2"
        v-text="onePage.content"
      />
    </div>

    <ya-map
    class="q-py-md q-px-xl ya-map"
    :coords="coords"
    />

    <q-carousel
      v-model="slide"
      transition-next="slide-left"
      transition-prev="slide-right"
      animated
      swipeable
      control-color="white"
      navigation
      infinite
      padding
      arrows
      class="full-width"
      height="100vh"
      :autoplay="3000">

      <q-carousel-slide
        v-for="(img,index) in onePage.content_images"
        :key="index"
        :img-src="img"
        :name="index"
      />
    </q-carousel>

    <div
    class="q-pa-xl about-content">
      <div
        class="text-grey-7 text-body2">
      <a
      class="standard-link"
      href="#">{{ $t('about_phone')+ ': +' + mainTelephone }}
      </a>
      </div>

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
      coords: [60, 30],
      slide: 0,
    };
  },
  computed: {
    ...mapState({
      onePage: state => state.content.pages.about_rest,
      mainTelephone: state => state.mainTelephone,
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

@media (max-width: $sizes.md)
  .about-content
    padding-left: $spaces.lg.x
    padding-right: $spaces.lg.x
  .ya-map
    padding-left: $spaces.lg.x
    padding-right: $spaces.lg.x
  .about-title
    font-size: 1.8rem

@media (max-width: $sizes.sm)
  .about-content
    padding-left: $spaces.md.x
    padding-right: $spaces.md.x
  .ya-map
    padding-left: $spaces.md.x
    padding-right: $spaces.md.x
  .about-title
    font-size: 1.6rem

</style>
