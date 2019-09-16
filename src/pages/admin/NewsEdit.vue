<template>
  <q-page padding>
    <template v-if="oneNews">
      <h1 class="text-h5" v-text="$t('edit_news')"/>
      <news-form
        :news="oneNews"
        :onSubmit="editNews"
        :button-text="$t('edit')"
        @change="onChange"
        class="q-mt-md"
      />
    </template>
    <template v-else>
      <div class="text-caption text-center" v-text="$t('not_found')"/>
    </template>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import NewsForm from 'components/forms/NewsForm.vue';

export default {
  name: 'NewsEdit',
  preFetch({ store, currentRoute }) {
    return store.dispatch('content/getOneNews', currentRoute.params.id);
  },
  computed: {
    ...mapState('content', ['oneNews']),
  },
  methods: {
    onChange(newNews) {
      this.$store.commit('content/setOneNews', newNews);
    },
    editNews() {
      const news = Object.assign({}, this.oneNews, {
        created_at: undefined,
        updated_at: undefined,
        prev: undefined,
        next: undefined,
        period: this.oneNews.period || undefined,
      });

      this.$store.dispatch('admin/editNews', news)
        .then(() => this.$router.push({ name: 'admin-news' }))
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
