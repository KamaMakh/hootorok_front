<template>
  <q-page padding>
    <h2 v-text="$t('reference_information')"/>
      <router-link to="info/booking-info">
        <p v-text="$t('booking')"></p>
      </router-link>
      <router-link to="info/payment">
        <p v-text="$t('payment')"></p>
      </router-link>
      <router-link to="info/faq">
        <p v-text="$t('faq')"></p>
      </router-link>
  </q-page>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {

    };
  },
};
</script>

<style scoped>

</style>
