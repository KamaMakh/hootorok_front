<template>
  <q-page padding class="q-ma-md text-center">
    <div>
      <h1 class="text-h2" v-text="$t('about')"/>
      <q-img
        class="q-px-xs"
        :src="onePage.main_image"
        style="max-height: 125px; max-width: 350px"
      />
      <p class="text-body1 text-weight-bold q-pt-md">
        {{ onePage.title }}
      </p>
      <div class="text-body1 space-pre">{{ onePage.content }}</div>
      <div v-for="img in onePage.content_images" v-bind:key="img">
        <q-img
        :src="img"
        :ratio="4/2"
      />
      </div>
      <ya-map :coords = "coords"></ya-map>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import YaMap from 'components/YaMap';

export default {
  preFetch({ store }) {
    return store.dispatch('content/getPage', 'about_rest');
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
