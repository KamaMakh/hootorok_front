<template>
  <q-page padding>
    <h1 class="text-h5" v-text="$t('add_news')"/>
    <news-form
      :news="news"
      :onSubmit="addNews"
      :button-text="$t('add')"
      @change="onChange"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
import NewsForm from 'components/forms/NewsForm.vue';

export default {
  name: 'AddNews',
  data() {
    return {
      news: {
        title: '',
        description: '',
        content: '',
        // TODO: remove temporary main_image
        main_image: 'https://penza-online.ru/upload/articles/2019/5d5a9b803fba7.jpeg',
        content_images: [],
        repost: false,
        period: undefined,
      },
    };
  },
  methods: {
    onChange(newNews) {
      this.news = newNews;
    },
    addNews() {
      const news = Object.assign({}, this.news);

      this.$store.dispatch('admin/addNews', news)
        .then(() => {
          this.$router.push({ name: 'admin-news' });
        })
        .catch((error) => {
          this.$q.notify({
            icon: 'close',
            color: 'negative',
            message: error,
          });
        });
    },
  },
  components: {
    NewsForm,
  },
};
</script>
