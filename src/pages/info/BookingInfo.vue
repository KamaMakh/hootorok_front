<template>
  <q-page padding>
    <h1
      class="text-h2"
      v-text="$t('booking')"
    />
    <div
      class="text-body1"
      v-text="page.content"
    />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BookingInfo',
  preFetch({ store }) {
    return store.dispatch('content/getOnePage', 'booking');
  },
  computed: {
    ...mapState({
      page: state => state.content.pages.booking,
    }),
  },
};
</script>
