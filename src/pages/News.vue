<template>
  <q-page padding>
    <h1 class="text-h4" v-text="$t('news_and_campaigns')"/>

    <div class="q-pa-md justify-end row">
      <div class="q-gutter-md" style="width: 80px; max-width: 100%;">
        <q-select v-model="perPage" :options="options" outlined dense/>
      </div>
    </div>
    <div class="q-pa-md row items-start justify-center q-gutter-md">
      <q-card
        flat
        bordered
        v-for="item in news"
        :key="item.id"
        class="col-lg-3 col-md-4 col-xs-12"
        style="max-width: 300px"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              {{ item.title }}
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2">{{ item.created_at }}</div>
        </q-card-section>

        <q-separator inset/>

        <q-card-actions>
          <q-btn flat>
            <router-link
              :to="{ name: 'news-detail', params: { id: item.id } }"
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
          :disabled="prevDisable"
          @click="changePage(-1)">
          <q-icon center name="arrow_back" />
          <div class="xs-hide">{{ `${$t('prev')} ${perPage}` }}</div>
        </q-btn>
        <q-btn outline
          class="q-mr-sm text-lowercase"
          color="blue"
          :disabled="nextDisable"
          @click="changePage(1)">
          <div class="xs-hide">{{ `${$t('next')} ${perPage}` }}</div>
          <q-icon center name="arrow_forward" />
        </q-btn>
      </q-btn-group>
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
      options: [5, 10, 30],
      perPage: 10,
      currentPage: 0,
    };
  },
  async mounted() {
    this.getNews();
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
      this.getNews();
    },
    getNews() {
      this.$store.dispatch('content/getNews', {
        offset: this.perPage * this.currentPage,
        limit: this.perPage,
      });
    },
  },
  watch: {
    perPage() {
      this.changePage();
    },
  },
  computed: {
    ...mapState('content', [
      'news',
      'newsTotal',
    ]),
    prevDisable() {
      return this.currentPage <= 0;
    },
    nextDisable() {
      return this.currentPage * this.perPage + this.perPage >= this.newsTotal;
    },
  },
};
</script>

<style>
</style>
