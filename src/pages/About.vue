<template>
  <q-page padding class="text-center">
    <h1 class="text-h2" v-text="$t('about')"/>
    <q-img
      class="q-px-xs"
      :src="onePage.main_image"
      style="max-height: 125px; max-width: 350px"
    />
    <p
      class="text-body1 text-weight-bold q-pt-md"
      v-text="onePage.title"
    />
    <div
      class="text-body1 space-pre"
      v-text="onePage.content"
    />
    <div
      v-for="img in onePage.content_images"
      :key="img"
    >
      <q-img
        :src="img"
        :ratio="4/2"
      />
    </div>
    <ya-map :coords="coords"/>
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
    };
  },
  computed: {
    ...mapState({
      onePage: state => state.content.pages.about_rest,
    }),
  },
};
</script>

<style scoped>
.ymap-container {
  height: 500px;
}
.space-pre {
  white-space: pre-wrap;
}
</style>
