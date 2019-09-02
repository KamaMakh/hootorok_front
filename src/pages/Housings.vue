<template>
  <q-page>
    <h1
      class="text-center text-h4"
      v-text="$t('housing_facilities')"
    />
    <div class="row">
      <div
        v-for="(housing, i) in housings"
        :key="housing.id"
        class="q-mb-md full-width text-center q-gutter-y-md"
      >
        <router-link
          :to="{ name: 'rooms' }"
          class="text-h6 text-default housing-title block"
          v-text="`${$t('housing')} ${housing.id}`"
        />
        <q-carousel
          v-model="housingsSlides[i]"
          class="full-width"
          animated
          thumbnails
          height="70vh"
          transition-prev="slide-right"
          transition-next="slide-left"
          infinite
          :fullscreen.sync="housingsFullscreens[i]"
        >
          <q-carousel-slide
            :name="index"
            v-for='(img, index) in housing.photos'
            :key="index"
            :img-src="img"
          />
          <!-- <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push
                round
                dense
                color="white"
                text-color="primary"
                :icon="housingsFullscreens[i] ? 'fullscreen_exit' : 'fullscreen'"
                @click="changeFullscreen(i)"
              />
            </q-carousel-control>
          </template> -->
        </q-carousel>
        <p
          class="text-body2 q-px-md housing-description text-left"
          v-text="housing.description"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Housings',
  data() {
    return {
      housingsSlides: [],
      housingsFullscreens: [],
    };
  },
  computed: {
    ...mapState('rooms', ['housings']),
  },
  methods: {
    changeFullscreen(index) {
      this.$set(this.housingsFullscreens, index, !this.housingsFullscreens[index]);
    },
  },
  async mounted() {
    this.$store.dispatch('rooms/getHousings')
      .then(() => {
        this.housingsSlides = Array.from(
          { length: this.housings.length },
          () => 0,
        );

        this.housingsFullscreens = Array.from(
          { length: this.housings.length },
          () => false,
        );
      });
  },
};
</script>

<style lang='stylus' scoped>
.housing-title
  text-decoration: none

.housing-description
  max-width: 800px
  margin-left: auto
  margin-right: auto
</style>
