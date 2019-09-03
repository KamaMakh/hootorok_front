<template>
  <q-page padding>
    <h1 class="text-h2" v-text="$t('profile')"/>
    {{ user }}
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Cabinet',
  data() {
    return {};
  },
  computed: {
    ...mapState('user', ['user']),
  },
};
</script>
