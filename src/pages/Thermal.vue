<template>
  <q-page v-if="!loading">
    <div
      class="q-pb-xl window-height row justify-center"
      :style="{ background: `url(${page.main_image})` }"
      style="background: no-repeat; background-size: cover;"
    >
      <div
        class="window-height full-width absolute"
        style="top: 0; left: 0; background: rgba(0, 0, 0, 0.3);"
      />
      <div class="relative-position q-pt-xl full-width">
        <div
          class="text-center q-ma-md text-h4"
          v-text="$t('thermal_springs')"
        />
        <div
          class="text-center text-body2 q-pt-lg"
          style="width: 80%; margin: auto;"
          v-text="page.content.substring(0, 100)"
        />
        <!-- TODO: .substring(0, 100) is a temporary decision -->
      </div>
    </div>
    <div>
      <h5 class="text-center" v-text="$t('thermal_water_composition')"/>
      <div
        class="q-px-md q-mb-xl q-mx-auto row-md column-sm wrap q-gutter-y-md"
        :class="{ 'q-gutter-md': $q.screen.gt.sm }"
      >
        <q-table
          class="col thermal-table"
          dense
          flat
          hide-bottom
          :pagination="{ rowsPerPage: 50 }"
          :title="$t('cations')"
          :columns="cationsColumns"
          :data="cationsData"
          row-key="name"
        >
        </q-table>
        <q-table
          class="col thermal-table"
          dense
          flat
          hide-bottom
          :pagination="{ rowsPerPage: 50 }"
          :title="$t('anions')"
          :columns="anionsColumns"
          :data="anionsData"
          row-key="name"
        >
        </q-table>
        <q-table
          class="col-12 thermal-table"
          dense
          flat
          hide-bottom
          hide-header
          :title="$t('pool_depth')"
          :columns="poolColumns"
          :data="poolData"
          row-key="name"
        >
          <template v-slot:bottom-row>
            <q-tr>
              <q-td
                colspan="100%"
                align="center"
                v-text="`${$t('temperature')}: 94℃`"
              />
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <q-carousel
      v-model="slide"
      transition-next="slide-left"
      transition-prev="slide-right"
      animated
      swipeable
      control-color="white"
      navigation
      infinite
      padding
      arrows
      class="text-white full-width"
      height="50vw"
    >
      <q-carousel-slide
        v-for="(img,index) in page.content_images"
        :key="index"
        :img-src="img"
        :name="index"
      />
    </q-carousel>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Thermal',
  data() {
    return {
      cationsColumns: [
        {
          name: 'key',
          label: this.$t('element'),
          field: 'parameter',
          align: 'left',
        },
        {
          name: 'value',
          label: this.$t('mg_l'),
          field: 'value',
          align: 'left',
        },
      ],
      cationsData: [
        {
          parameter: `${this.$t('lithium')} (Li)`,
          value: '1,2',
        },
        {
          parameter: `${this.$t('ammonium')} (NH4)`,
          value: '2,17',
        },
        {
          parameter: `${this.$t('sodium')} (Na)`,
          value: '3,5',
        },
        {
          parameter: `${this.$t('potassium')} (K)`,
          value: '4,7',
        },
        {
          parameter: `${this.$t('magnesium')} (Mg)`,
          value: '0,04',
        },
        {
          parameter: `${this.$t('calcium')} (Ca)`,
          value: '2,37',
        },
        {
          parameter: `${this.$t('iron')} (Fe)`,
          value: '0,31',
        },
        {
          parameter: `${this.$t('manganese')} (Mn)`,
          value: '0,09',
        },
        {
          parameter: `${this.$t('zinc')} (Zn)`,
          value: '0,10',
        },
        {
          parameter: `${this.$t('copper')} (Cu)`,
          value: '0,22',
        },
        {
          parameter: `${this.$t('cobalt')} (Co)`,
          value: '0,13',
        },
        {
          parameter: `${this.$t('nickel')} (Ni)`,
          value: '0,10',
        },
        {
          parameter: `${this.$t('mercury')} (Hg)`,
          value: '< 0,001',
        },
        {
          parameter: `${this.$t('chromium')} (Cr)`,
          value: '0,04',
        },
        {
          parameter: `${this.$t('lead')} (Pl)`,
          value: '< 0,05',
        },
      ],
      anionsColumns: [
        {
          name: 'key',
          label: this.$t('element'),
          field: 'parameter',
          align: 'left',
        },
        {
          name: 'value',
          label: this.$t('mg_l'),
          field: 'value',
          align: 'left',
        },
      ],
      anionsData: [
        {
          parameter: `${this.$t('fluorine')} (F)`,
          value: '4,0',
        },
        {
          parameter: `${this.$t('chlorine')} (Cl)`,
          value: '190,8',
        },
        {
          parameter: `${this.$t('bromine')} (Br)`,
          value: '2,0',
        },
        {
          parameter: `${this.$t('iodine')} (I)`,
          value: '< 0,001',
        },
        {
          parameter: `${this.$t('sulfate')} (SO4)`,
          value: '1400,0',
        },
        {
          parameter: `${this.$t('hydrosulfite')} (HS)`,
          value: '< 0,005',
        },
        {
          parameter: `${this.$t('hydrocarbonate')} (HCO3)`,
          value: '430,8',
        },
        {
          parameter: `${this.$t('carbonate')} (CO3)`,
          value: '9,9',
        },
        {
          parameter: `${this.$t('arsenic')} (As)`,
          value: '< 0,01',
        },
        {
          parameter: `${this.$t('hydrophosphate')} (HPO4)`,
          value: '-',
        },
        {
          parameter: `${this.$t('nitrate')} (NO3)`,
          value: '5,0',
        },
        {
          parameter: `${this.$t('nitrite')} (NO2)`,
          value: '< 0,01',
        },
      ],
      poolColumns: [
        {
          name: 'number',
          field: 'number',
          align: 'left',
        },
        {
          name: 'depth1',
          field: 'depth1',
          align: 'left',
        },
        {
          name: 'depth2',
          field: 'depth2',
          align: 'left',
        },
        {
          name: 'depth3',
          field: 'depth3',
          align: 'left',
        },
      ],
      poolData: [
        {
          number: `1 ${this.$t('building')}`,
          depth1: '1,50',
          depth2: '1,20',
          depth3: '0,60',
        },
        {
          number: `2 ${this.$t('building')}`,
          depth1: '1,75',
          depth2: '0,80',
          depth3: '0,60',
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

<style lang="stylus">
.thermal-table .q-table__top
  justify-content: center
</style>
