<template>
    <q-page padding class="news-list">
      <h1 class="text-h4" v-text="$t('news')"/>

      <div class="q-pa-md justify-end row">
        <div class="q-gutter-md" style="width: 80px; max-width: 100%;">
          <q-select v-model="perPage" :options="options"/>
        </div>
      </div>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card
          flat
          bordered
          v-for="news in droppedList"
          :key="news.id"
          class="my-card col-lg-3 col-md-4 col-xs-12"
          style="max-width: 300px"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                {{ news.short_text }}
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2">{{ news.date }}</div>
          </q-card-section>

          <q-separator inset/>

          <q-card-actions>
            <q-btn flat>
              <router-link
                :to="{ name: 'newsDetail', params: { id: news.id } }"
                class="standard-link text-black"
                v-text="$t('more')"
              />
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
        <div class="q-pa-md justify-center row">
          <q-btn-group style="box-shadow: none">
            <q-btn outline
              color="blue q-mr-sm text-lowercase"
              icon="arrow_back"
              :disabled="currentPage <= 0"
              @click="changePage(-1)"
              :label="$t('prev') + ' ' + perPage" />
            <q-btn outline
              color="blue q-ml-sm text-lowercase"
              icon-right="arrow_forward"
              :disabled="currentPage * perPage + perPage >= newsCount"
              @click="changePage(1)"
              :label="$t('next') + ' ' + perPage"/>
          </q-btn-group>
        </div>
    </q-page>
</template>

<script>
export default {
  name: 'News',
  beforeRouteEnter(from, to, next) {
    // eslint-disable-next-line
    // удалим когда будет готов бэк
    const info = {};
    info.data = [
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '05.08.2019',
        id: 1,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 2,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 3,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '05.08.2019',
        id: 4,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 5,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 6,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '05.08.2019',
        id: 7,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 8,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 9,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '05.08.2019',
        id: 10,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 11,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 12,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '05.08.2019',
        id: 13,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 14,
      },
      {
        short_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '06.08.2019',
        id: 15,
      },
    ];
    next(vm => vm.setData(info));
  },
  data() {
    return {
      newsList: [],
      droppedList: [],
      options: [5, 10, 30],
      perPage: 10,
      newsCount: 0,
      currentPage: 0,
    };
  },
  methods: {
    setData(values) {
      this.newsList = values.news;
      this.newsCount = values.newsTotal;
      this.dropList();
    },
    dropList() {
      if (this.newsCount > 5) {
        const listFrom = this.perPage * this.currentPage;
        this.droppedList = this.newsList.slice(listFrom, listFrom + this.perPage);
      } else {
        this.droppedList = this.newsList;
      }
    },
    changePage(type) {
      if (type === 1) {
        this.currentPage += 1;
      } else if (type === -1) {
        this.currentPage -= 1;
      } else {
        this.currentPage = 0;
      }
      this.dropList();
    },
  },
  watch: {
    perPage() {
      this.changePage();
    },
  },
  computed() {
    this.$store.dispatch('content/getNews', { offset: 10, limit: 10 })
      .then((values) => {
        this.setData(values);
      })
      .catch((error) => {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: error,
        });
      });
  },
};
</script>

<style>
</style>
