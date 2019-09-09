<template>
  <q-page padding>
    <h1 class="text-h5" v-text="$t('add_service')"/>
    <page-form
      :page="page"
      :onSubmit="addPage"
      :button-text="$t('add')"
      @change="onChange"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
import PageForm from 'components/forms/PageForm.vue';

export default {
  name: 'AddPage',
  data() {
    return {
      page: {
        text_id: '',
        category: '',
        type: '',
        title: '',
        description: '',
        content: '',
        active: false,
        content_images: [],
      },
    };
  },
  methods: {
    onChange(newPage) {
      this.page = newPage;
    },
    addPage() {
      const page = Object.assign({}, this.page);

      this.$store.dispatch('admin/addPage', page)
        .then(() => {
          this.$router.push({ name: 'admin-services' });
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
    PageForm,
  },
};
</script>
