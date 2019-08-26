<template>
  <q-page padding class="q-ma-md text-center">
    <div>
      <h1 class="text-h2" v-text="$t('about')"/>
      <q-img
        class="q-px-xs"
        :src="aboutInfo.content_images[1]"
        :ratio="16/6"
      />
      <p class="text-body1 text-weight-bold q-pt-md">
        {{ aboutInfo.title }}
      </p>
      <div class="text-body1 space-pre">{{ aboutInfo.content }}</div>
      <ya-map :coords = "coords"></ya-map>
    </div>
  </q-page>
</template>

<script>
import YaMap from 'components/YaMap';

export default {
  name: 'About',
  components: { YaMap },
  data() {
    return {
      coords: [60, 30],
    };
  },
  computed: {
    aboutInfo() {
      return this.$store.state.content.onePage;
    },
  },
  async mounted() {
    this.$store.dispatch('content/getOnePage', 'about_rest');
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
