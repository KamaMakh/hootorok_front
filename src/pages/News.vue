<template>
  <q-page>
    <h1
      class="text-h4 q-px-md"
      v-text="$t('news_and_campaigns')"
    />

    <div class="justify-end items-center row q-px-md">
      <div
        class="text-grey q-mr-sm"
        v-text="$t('display_by')"
      />
      <div class="q-gutter-md" style="width: 80px; max-width: 100%;">
        <q-select
          dense
          outlined
          v-model="perPage"
          :options="perPageSelection"
        />
      </div>
    </div>
    <div class="row items-start justify-center q-gutter-md q-mx-auto q-mt-md">
      <q-card
        flat
        bordered
        v-for="item in news"
        :key="item.id"
        class="col-md-4 col-sm-6 col-xs-12 unelevated no-border q-mx-none q-px-md"
      >
        <q-card-section class="q-pa-none q-mb-md text-bold">
          <router-link
            :to="{ name: 'news-item', params: { id: item.id } }"
            class="row items-center no-wrap standard-link text-default"
            v-text="item.title"
          />
        </q-card-section>

        <router-link
          :to="{ name: 'news-item', params: { id: item.id } }"
        >
          <img
            :src="item.main_image"
            class="q-mb-sm"
            style="max-width: 100%;"
          >
        </router-link>

        <q-separator class="q-mx-none"/>

        <q-card-section class="q-pa-none q-my-sm">
          <div
            class="text-subtitle2"
            v-text="formatDate(item.created_at)"
          />
        </q-card-section>

        <div class="q-pa-none q-my-md row flex justify-between items-center">
          <q-card-section
            class="q-pa-none ellipsis-2-lines text-grey col-9"
            v-text="item.description"
          />

          <q-card-actions class="col-3 justify-end">
            <q-btn
              flat
              color="grey"
              class="justify-center items-center"
            >
              <q-icon name="arrow_forward_ios" style="font-size: 14px;"/>
              <router-link
                :to="{ name: 'news-item', params: { id: item.id } }"
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
      />
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapState } from 'vuex';

const perPageSelection = [6, 12, 18];

export default {
  name: 'News',
  data() {
    return {
      newsList: [],
      droppedList: [],
      perPageSelection,
      perPage: perPageSelection[0],
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
    formatDate(timestamp) {
      return date.formatDate(timestamp * 1000, 'DD.MM.YYYY');
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
