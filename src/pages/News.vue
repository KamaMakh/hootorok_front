<template>
    <q-page class="q-px-md q-pb-md news-list">
        <h1 class="text-h4" v-text="$t('news')"/>

        <div class="q-pa-md justify-end row">
            <div class="q-gutter-md" style="width: 80px; max-width: 100%;">
                <q-select v-model="per_page" :options="options"/>
            </div>
        </div>
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="news in dropped_list"
                    v-bind:key="news.id"
                    flat bordered
                    class="my-card col-lg-3 col-md-4 col-xs-12"
                    style="max-width: 300px">
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
                       :disabled="min_disabled"
                       @click="changePage(-1)"
                       :label="$t('prev_ten')" />
                <q-btn outline
                       color="blue q-ml-sm text-lowercase"
                       icon-right="arrow_forward"
                       :disabled="max_disabled"
                       @click="changePage(1)"
                       :label="$t('next_ten')"/>
            </q-btn-group>
        </div>
    </q-page>
</template>

<script>
import { Dialog } from 'quasar';

export default {
  name: 'News',
  beforeRouteEnter(from, to, next) {
    // eslint-disable-next-line
    let info = {};
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

    // Promise.all([axios.get('api address/getNews')])
    //   .then((values) => {
    //     next(vm => vm.setData(values[0]));
    //   })
    //   .catch((error) => {
    //     next(vm => vm.showErrorMessage(error));
    //   });
  },
  data() {
    return {
      news_list: [],
      dropped_list: [],
      options: [5, 10, 30],
      per_page: 10,
      news_count: 0,
      current_page: 0,
      min_disabled: true,
      max_disabled: false,
    };
  },
  methods: {
    setData(info) {
      if (info.data.length) {
        this.news_list = info.data;
        this.news_count = info.data.length;
        this.dropList();
      }
    },
    showErrorMessage(errorMessage) {
      Dialog.create({
        title: 'Error',
        message: errorMessage,
      });
    },
    dropList() {
      if (this.news_count > 5) {
        const listFrom = this.per_page * this.current_page;
        this.dropped_list = this.news_list.slice(listFrom, listFrom + this.per_page);
      } else {
        this.dropped_list = this.news_list;
        this.max_disabled = true;
      }
    },
    changePage(type) {
      if (type === 1) {
        this.current_page += 1;
      } else if (type === -1) {
        this.current_page -= 1;
      } else {
        this.current_page = 0;
      }
      this.max_disabled = this.current_page * this.per_page + this.per_page >= this.news_count;
      this.min_disabled = this.current_page <= 0;
      this.dropList();
    },
  },
  watch: {
    per_page() {
      this.changePage();
    },
  },
};
</script>

<style>
</style>
