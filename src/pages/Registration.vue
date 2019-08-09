<template>
  <q-page>
    <q-card class="auth-tabs">
        <q-tabs
        v-model="tab"
        dense
        class="text-grey q-mt-xl"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <register />
      </q-tabs>
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {
    register: require('components/Auth/Registration.vue').default,
  },
  data() {
    return {
      tab: 'Login',
    };
  },
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
