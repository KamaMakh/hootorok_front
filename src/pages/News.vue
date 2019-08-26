<template>
  <q-page padding>
    <h1 class="text-h4" v-text="$t('news')"/>

    <div class="q-pa-md justify-end row">
      <div class="q-gutter-md" style="width: 80px; max-width: 100%;">
        <q-select v-model="perPage" :options="options" outlined dense/>
      </div>
    </div>
    <div class="q-pa-md row items-start justify-center q-gutter-md">
      <q-card
        flat
        bordered
        v-for="news in allNews"
        :key="news.id"
        class="col-lg-3 col-md-4 col-xs-12"
        style="max-width: 300px"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              {{ news.title }}
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2">{{ news.created_at }}</div>
        </q-card-section>

        <q-separator inset/>

        <q-card-actions>
          <q-btn flat>
            <router-link
              :to="{ name: 'news-detail', params: { id: news.id } }"
              class="standard-link text-black"
              v-text="$t('more')"
            />
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md justify-center row">
      <q-btn-group unelevated>
        <q-btn outline
          class="q-mr-sm text-lowercase"
          color="blue"
          icon="arrow_back"
          :disabled="prevDisable"
          @click="changePage(-1)"
          :label="`${$t('prev')} ${perPage}`" />
        <q-btn outline
          class="q-mr-sm text-lowercase"
          color="blue"
          icon-right="arrow_forward"
          :disabled="nextDisable"
          @click="changePage(1)"
          :label="`${$t('next')} ${perPage}`"/>
      </q-btn-group>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'News',
  data() {
    return {
      newsList: [],
      droppedList: [],
      options: [5, 10, 30],
      perPage: 10,
      newsCount: 60, // нужно что бы с бэка приходило
      currentPage: 0,
    };
  },
  methods: {
    changePage(type) {
      if (type === 1) {
        this.currentPage += 1;
      } else if (type === -1) {
        this.currentPage -= 1;
      } else {
        this.currentPage = 0;
      }
      this.getAllNews({
        offset: this.perPage * this.currentPage,
        limit: this.perPage,
      });
    },
    ...mapActions([
      'getAllNews',
    ]),
  },
  watch: {
    perPage() {
      this.changePage();
    },
  },
  computed: {
    ...mapGetters('content', {
      allNews: 'getAllNews',
    }),
    prevDisable() {
      return this.currentPage <= 0;
    },
    nextDisable() {
      return this.currentPage * this.perPage + this.perPage >= this.newsCount;
    },
  },
};
</script>

<style>
</style>
