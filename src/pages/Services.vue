<template>
  <q-page padding class="text-center">
    <h1 class="text-h2" v-text="$t('list_of_services')"/>
    <div class="q-pa-md">
      <div class="row">
        <div class="q-ma-md items-center" v-for="item in services"
             :key="item.id"
             @click="$router.push({
             name: 'service',
             params: {
             id: item.id
             },
             })">
          <q-card class="card">
            <q-img
              :src="item.main_image"
              class="image"
            ></q-img>
          </q-card>
          <p>{{item.title}}</p>
        </div>
      </div>
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

<style scoped>
  .card{
    width: 350px;
    cursor: pointer;
  }
  .image {
    height: 200px;
  }
</style>
