<template>
  <q-page class="text-center">
    <h1
      class="text-h2"
      v-text="$t('list_of_services')"
    />
    <div class="row q-gutter-y-md">
      <router-link
        class="card-link"
        v-for="item in services"
        :key="item.text_id"
        :to="{
          name: 'service',
          params: { id: item.text_id },
        }"
      >
        <q-card>
          <q-img
            :src="item.main_image"
            basic
            :ratio="16/9"
          />
        </q-card>
        <div
          class="q-my-sm text-default"
          v-text="item.title"
        />
      </router-link>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Service',
  async mounted() {
    this.$store.dispatch('content/getServices');
  },
  computed: {
    ...mapState('content', ['services']),
  },
};
</script>
