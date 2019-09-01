<template>
  <q-page padding>
    <h2 v-text="$t('reference_information')"/>
    <div class="row column q-gutter-y-md">
      <router-link
        class="standard-link text-default"
        :to="{ name: 'booking-info' }"
        v-text="$t('booking')"
      />
      <router-link
        class="standard-link text-default"
        :to="{ name: 'payment-info' }"
        v-text="$t('payment')"
      />
      <router-link
        class="standard-link text-default"
        :to="{ name: 'faq' }"
        v-text="$t('faq')"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Info',
};
</script>
