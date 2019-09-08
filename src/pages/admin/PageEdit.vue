<template>
  <q-page padding>
    <template v-if="page">
      <h1 class="text-h5" v-text="$t('edit_page')"/>
      <page-form
        :page="page.page"
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
    ...mapState('content', ['page']),
  },
  methods: {
    onChange(newPage) {
      this.page.page = newPage;
      // this.$store.commit('content/setOnePage', newPage);
    },
    editPage() {
      let page = Object.assign({}, this.page.page);
      const filteredObject = {};
      const p = new Set(Object.keys(page));
      const blacklist = ['id', 'category', 'updated_at', 'created_at'];
      blacklist.forEach(a => p.delete(a));
      // eslint-disable-next-line
      [...p].forEach(k => filteredObject[k] = page[k]);
      page = filteredObject;
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
