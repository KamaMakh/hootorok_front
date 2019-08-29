<template>
  <q-page padding v-if="!loading">
    <div class="q-pb-xl window-height text-white row justify-center items-center">
      <div
        class="window-height full-width absolute"
        :style="{background: `url(${page.main_image})`}"
        style="top: 0; left: 0; background: no-repeat; background-size: cover;
               filter: blur(2px);"
      />
      <div
        class="q-pa-lg-lg q-pa-sm relative-position"
        :style="{background: 'rgba(0,0,0,0.4)'}"
        style="min-width: 50vw;"
      >
        <div
          class="text-center q-ma-md"
          :class="{'text-h2': $q.screen.gt.sm, 'text-h3': $q.screen.lt.md,
                   'text-h4': $q.screen.lt.sm}"
          style="font-weight: bold"
          v-text="$t('thermal_springs')"
        />
        <q-scroll-area
          class="q-pa-md"
          style="height: 60vh;"
        >
          <div
            class="q-mx-auto text-justify"
            :class="{'text-body1': $q.screen.gt.sm, 'text-body2': $q.screen.lt.md}"
            style="text-indent: 1.5em"
            v-for="(text, index) in page.content.split('    ').filter(element => element !== '')"
            v-text="text"
            :key="index"
          />
        </q-scroll-area>
      </div>
    </div>
    <div class="q-pa-md q-mb-xl">
      <h5 class="text-center">{{ $t('thermal_water_composition') }}</h5>
      <div
        class="q-pa-md q-mx-auto row-md column-sm wrap q-gutter-y-md"
        :class="{'q-gutter-md': $q.screen.gt.sm}"
      >
        <q-table
          class="col"
          dense
          flat
          hide-bottom
          :pagination="{rowsPerPage: 50}"
          :title="$t('cations')"
          :columns="cations_columns"
          :data="cations_data"
          row-key="name"
        >
        </q-table>
        <q-table
          class="col"
          dense
          flat
          hide-bottom
          :pagination="{rowsPerPage: 50}"
          :title="$t('anions')"
          :columns="anions_columns"
          :data="anions_data"
          row-key="name"
        >
        </q-table>
        <q-table
          class="col-12"
          dense
          flat
          hide-bottom
          hide-header
          :title="$t('pool_depth')"
          :columns="pool_columns"
          :data="pool_data"
          row-key="name"
        >
          <template v-slot:bottom-row>
            <q-tr>
              <q-td colspan="100%" align="center">
               {{$t('temperature')}}: 94℃
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <div class="q-pa-md" style="height: 50vw">
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
        class="text-white  absolute full-width"
        style="left: 0; bottom: 0"
        height="50vw"
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
      cations_columns: [
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
      cations_data: [
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
      anions_columns: [
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
      anions_data: [
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
      pool_columns: [
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
      pool_data: [
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
