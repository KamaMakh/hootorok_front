<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$i18n.locale = this.$store.state.lang;
  },
};
</script>

<style>
</style>
