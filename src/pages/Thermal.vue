<template>
  <q-page padding v-if="!loading">
    <h2 class="text-h2 text-center" v-text="$t('thermal_springs')"/>
    <p class="q-pa-md text-body1">
      {{ page.content }}
    </p>
    <q-img :src='page.main_image'/>
    <div class="q-pa-md">
      <q-table
      :title="$t('thermal_water_characteristics')"
      :columns="columns"
      :data="data"
      row-key="name"/>
    </div>
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-next="scale"
        transition-prev="scale"
        animated
        control-color="white"
        navigation
        infinite
        padding
        arrows
        class="text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide v-for="(img,index) in page.content_images"
        :key="index" :img-src="img" :name="index">

        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Thermal',
  data() {
    return {
      columns: [
        {
          name: 'key',
          label: this.$t('thermal_parameter'),
          field: 'parameter',
          align: 'left',
        },
        {
          name: 'value',
          label: this.$t('thermal_value'),
          field: 'value',
          align: 'left',
        },
      ],
      loading: true,
      slide: 0,
    };
  },
  computed: {
    page() {
      return this.$store.getters['content/getPage']('about_termal');
    },
  },
  mounted() {
    this.$store.dispatch('content/getOnePage', 'about_termal').then(() => {
      this.loading = false;
    });
  },
};
</script>
