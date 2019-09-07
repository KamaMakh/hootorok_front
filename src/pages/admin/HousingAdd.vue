<template>
  <q-page padding>
    <h1 class="text-h5" v-text="$t('add_housing')"/>
    <housing-form
      :housing="housing"
      :onSubmit="addHousing"
      :button-text="$t('add')"
      @change="onChange"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
import HousingForm from 'components/forms/HousingForm.vue';

export default {
  name: 'AddHousing',
  data() {
    return {
      housing: {
        title: '',
        number: null,
        description: '',
        photos: [],
      },
    };
  },
  methods: {
    onChange(newHousing) {
      this.housing = newHousing;
    },
    addHousing() {
      const housing = Object.assign({}, this.housing);

      this.$store.dispatch('admin/addHousing', housing)
        .then(() => {
          this.$router.push({ name: 'admin-housings' });
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
    HousingForm,
  },
};
</script>
