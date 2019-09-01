<template>
  <q-page padding>
    <h1
      class="text-h2"
      v-text="$t('payment')"
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
  name: 'PaymentInfo',
  preFetch({ store }) {
    return store.dispatch('content/getOnePage', 'payment');
  },
  computed: {
    ...mapState({
      page: state => state.content.pages.payment,
    }),
  },
};
</script>
