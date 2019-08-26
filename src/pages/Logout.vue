<template>
  <q-page></q-page>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('user/logout')
      .then(() => {
        this.$router.push({ name: 'home' });
      });
  },
};
</script>
