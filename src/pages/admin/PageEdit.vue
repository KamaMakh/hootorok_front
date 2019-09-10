<template>
  <q-page padding>
    <template v-if="currentPage">
      <h1 class="text-h5" v-text="$t('edit_page')"/>
      <page-form
        :page="currentPage"
        :onSubmit="editPage"
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
import PageForm from 'components/forms/PageForm.vue';

export default {
  name: 'PageEdit',
  preFetch({ store, currentRoute }) {
    return store.dispatch('content/getOnePage', currentRoute.params.id);
  },
  computed: {
    ...mapState('content', ['pages']),
    currentPage() {
      return this.pages[this.$attrs.id];
    },
  },
  methods: {
    onChange(newPage) {
      this.$store.commit('content/setPage', {
        id: newPage.text_id,
        page: newPage,
      });
    },
    editPage() {
      const page = Object.assign({}, this.currentPage, {
        created_at: undefined,
        updated_at: undefined,
        id: undefined,
      });

      this.$store.dispatch('admin/editPage', page)
        .then(() => this.$router.push({ name: 'admin-services' }))
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
    PageForm,
  },
};
</script>
