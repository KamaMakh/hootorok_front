<template>
  <q-page padding>
    <template v-if="!oneNews">
      {{ $t('news_not_found') }}
    </template>
    <template v-else>
      <h1
        class="text-h5 text-center"
        v-text="oneNews.title"
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
          v-for="(img, i) in oneNews.content_images"
          :key="i"
          :img-src="img"
          :name="i"
        />
      </q-carousel>
      <div
        class="text-body2 q-my-md"
        v-text="oneNews.description"
      />
      <div class="text-bold" v-text="formatDate(oneNews.created_at)"/>
      <div class="row justify-center q-gutter-x-sm">
        <q-btn
          flat
          no-caps
          v-if="oneNews.prev"
          icon="keyboard_arrow_left"
          :to="{ name: 'news-item', params: { id: oneNews.prev } }"
        >
          <div v-text="$t('prev')"/>
        </q-btn>
        <q-btn
          flat
          no-caps
          v-if="oneNews.next"
          icon-right="keyboard_arrow_right"
          :to="{ name: 'news-item', params: { id: oneNews.next } }"
        >
          <div v-text="$t('next')"/>
        </q-btn>
      </div>
    </template>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapState } from 'vuex';

export default {
  name: 'news',
  preFetch({ store, currentRoute }) {
    return store.dispatch('content/getOneNews', currentRoute.params.id);
  },
  data() {
    return {
      slide: 0,
    };
  },
  computed: {
    ...mapState('content', ['oneNews']),
  },
  methods: {
    formatDate(timestamp) {
      return date.formatDate(timestamp, 'DD.MM.YYYY');
    },
  },
};
</script>
