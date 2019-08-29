<template>
  <q-page padding>
    <h1 class="text-h4" v-text="$t('news_and_campaigns')"/>

    <div class="q-pa-md justify-end items-center row">
      <div class="text-grey q-mr-sm">
        {{ $t('display_by') }}
      </div>
      <div class="q-gutter-md" style="width: 80px; max-width: 100%;">
        <q-select v-model="perPage" :options="options" outlined dense/>
      </div>
    </div>
    <div class="q-pa-md row items-start justify-center q-gutter-md q-mx-auto">
      <q-card
        flat
        bordered
        v-for="item in news"
        :key="item.id"
        class="col-md-4 col-sm-6 col-xs-12 unelevated no-border q-mx-none q-px-md"
      >
        <q-card-section class="q-py-none q-px-sm q-mb-md">
          <div class="row items-center no-wrap">
            <div class="col ellipsis">
              {{ item.title }}
            </div>
          </div>
        </q-card-section>

        <img class="q-mb-sm q-px-sm" :src="item.main_image">

        <q-separator class="q-mx-none"/>

        <q-card-section class="q-pa-none q-my-sm q-px-sm">
          <div class="text-subtitle2">{{ formatDate(item.created_at) }}</div>
        </q-card-section>

        <div class="q-pa-none q-my-md row flex justify-between items-center">
          <q-card-section class="q-pa-none q-px-sm ellipsis-2-lines text-grey col-9">
            {{ item.description }}
          </q-card-section>

          <q-card-actions class="col-3 justify-end">
            <q-btn flat class="justify-center items-center" color="grey">
              <i class="material-icons text-body2">arrow_forward_ios</i>
              <router-link
                :to="{ name: 'news-detail', params: { id: item.id } }"
                class="standard-link text-black"
              />
            </q-btn>
          </q-card-actions>
        </div>
      </q-card>
    </div>
    <div v-if="pages > 1" class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="pages"
        :direction-links="true"
      >
      </q-pagination>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'News',
  data() {
    return {
      newsList: [],
      droppedList: [],
      options: [6, 6, 12, 18],
      perPage: 6,
      currentPage: 1,
    };
  },
  async mounted() {
    this.getNews();
  },
  methods: {
    changePage() {
      this.getNews();
    },
    getNews() {
      this.$store.dispatch('content/getNews', {
        offset: this.perPage * (this.currentPage - 1),
        limit: this.perPage,
      });
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
  watch: {
    perPage() {
      this.changePage();
    },
    currentPage() {
      this.changePage();
    },
  },
  computed: {
    ...mapState('content', [
      'news',
      'newsTotal',
    ]),
    pages() {
      return Math.ceil(this.newsTotal / this.perPage);
    },
  },
};
</script>

<style>
</style>
