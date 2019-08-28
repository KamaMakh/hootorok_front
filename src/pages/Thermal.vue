<template>
  <q-page padding v-if="!loading">
    <h2
      class="text-h2 text-center"
      v-text="$t('thermal_springs')"
    />
    <p
      class="q-pa-md text-body1"
      v-text="page.content"
    />
    <q-img :src='page.main_image'/>
    <div class="q-pa-md">
      <q-table
        :title="$t('thermal_water_characteristics')"
        :columns="columns"
        :data="data"
        row-key="name"
      />
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
        <q-carousel-slide
          v-for="(img,index) in page.content_images"
          :key="index"
          :img-src="img"
          :name="index"
        />
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Thermal',
  data() {
    return {
      data: [],
      columns: [
        {
          name: 'key',
          label: this.$t('parameter'),
          field: 'parameter',
          align: 'left',
        },
        {
          name: 'value',
          label: this.$t('value'),
          field: 'value',
          align: 'left',
        },
      ],
      loading: true,
      slide: 0,
    };
  },
  computed: {
    ...mapGetters('content', ['getPage']),
    page() {
      return this.getPage('about_termal');
    },
  },
  mounted() {
    this.$store.dispatch('content/getOnePage', 'about_termal')
      .then(() => {
        this.loading = false;
      });
  },
};
</script>
