<template>
  <q-page padding>
    <template v-if="housing">
      <h1 class="text-h5" v-text="$t('edit_housing')"/>
      <housing-form
        :housing="housing"
        :onSubmit="editHousing"
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
import HousingForm from 'components/forms/HousingForm.vue';

export default {
  name: 'HousingEdit',
  preFetch({ store, currentRoute }) {
    return store.dispatch('rooms/getHousing', currentRoute.params.id);
  },
  computed: {
    ...mapState('rooms', ['housing']),
  },
  methods: {
    onChange(newHousing) {
      this.$store.commit('rooms/setHousing', newHousing);
    },
    editHousing() {
      const housing = Object.assign({}, this.housing);

      this.$store.dispatch('admin/editHousing', housing)
        .then(() => this.$router.push({ name: 'admin-housings' }))
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
