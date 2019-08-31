<template>
  <q-page padding>
    <h1 class="text-h2 text-center" v-text="$t('rooms_and_houses')"/>
    <div class="row">
      <div class="q-pa-md col-xs-12 col-sm-4 col-md-3">
        <q-select
          v-model="model"
          :options="options"
          :label="$t('sort_by_price_per_day')"
          @click="sortArray">
        </q-select>
        <q-option-group
          v-model="group"
          :options="formatHousings()"
          color="primary"
          @input="group === 0 ? showAll() : filterData(group)">
        </q-option-group>
        <q-btn-toggle
          v-model="view"
          size="sm"
          push
          glossy
          toggle-color="primary"
          :options="[
          { value: 'one', slot: 'one'},
          { value: 'two', slot: 'two'},
        ]">
          <template v-slot:one>
            <div>
              <q-icon name="view_module"/>
            </div>
          </template>
          <template v-slot:two>
            <div>
              <q-icon name="view_headline"/>
            </div>
          </template>
        </q-btn-toggle>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-9">
        <div class="q-pa-md row items-start q-gutter-md" v-if="view === 'one'">
          <q-card class="card" v-for="item in result" :key="item.id">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" class="image" @click="showCarousel()">
            <q-card-section>
              <div class="text-h6"
                   @click="$router.push({
                  name: 'room',
                  params: {
                  id: item.id,
                  },
                  })"
              >{{$t('room_number')}}{{item.id}}</div>
              <div class="text-h6"
                   @click="$router.push({
                  name: 'housings',
                  })"
              >{{$t('housing')}}{{item.housing}}</div>
            </q-card-section>
            <q-card-section>
              <p>{{$t('number_of_adults_and_children')}}{{item.capacity}}</p>
              <p>{{$t('price_per_day')}}{{price}}</p>
            </q-card-section>
            <q-dialog v-model="showAllPhoto" >
              <div class="carousel">
                <q-carousel
                  animated
                  v-model="slide"
                  arrows
                  navigation
                  infinite
                >
                  <q-carousel-slide
                    v-for="(image, index) in images"
                    :img-src="image"
                    :key="index"
                    :name="index + 1"
                  ></q-carousel-slide>
                </q-carousel>
              </div>
            </q-dialog>
          </q-card>
        </div>
        <div class="q-pa-md" v-if="view === 'two'">
          <q-markup-table>
            <thead>
            <tr>
              <th class="text-left">{{$t('photo')}}</th>
              <th class="text-right">{{$t('room_number')}}</th>
              <th class="text-right">{{$t('housing')}}</th>
              <th class="text-right">{{$t('price_per_day')}}</th>
              <th class="text-right">{{$t('number_of_adults_and_children')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <tr v-for="item in result" :key="item.id">
              <td class="text-left">
                <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small_image" @click="showCarousel()">
              </td>
              <td class="text-right"
                  @click="$router.push({
                name: 'room',
                params: {
                id: item.id,
                },
                })"
              >{{item.id}}</td>
              <td class="text-right"
                  @click="$router.push({
                  name: 'housings',
                  })"
              >{{item.housing}}</td>
              <td class="text-right">{{price}}</td>
              <td class="text-right">{{item.capacity}}</td>
              <q-dialog v-model="showAllPhoto" >
                <div class="carousel">
                  <q-carousel
                    animated
                    v-model="slide"
                    arrows
                    navigation
                    infinite
                  >
                    <q-carousel-slide
                      v-for="(image, index) in images"
                      :img-src="image"
                      :key="index"
                      :name="index + 1"
                    ></q-carousel-slide>
                  </q-carousel>
                </div>
              </q-dialog>
            </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Rooms',
  data() {
    return {
      result: [],
      isDesc: true,
      model: null,
      options: ['уменьшению цены', 'возрастанию цены'],
      view: 'one',
      group: 0,
      price: '2500 руб',
      showAllPhoto: false,
      slide: 1,
      images: [
        'https://cdn.quasar.dev/img/mountains.jpg',
        'https://cdn.quasar.dev/img/parallax2.jpg',
        'https://cdn.quasar.dev/img/parallax1.jpg',
      ],
    };
  },
  methods: {
    showAll() {
      this.result = this.roomsList;
    },
    filterData(index) {
      this.result = this.roomsList.filter(obj => obj.housing === index);
    },
    sortArray() {
      if (this.isDesc) {
        this.result.sort((a, b) => a.price - b.price);
        this.isDesc = !this.isDesc;
      } else {
        this.result.sort((a, b) => b.price - a.price);
        this.isDesc = !this.isDesc;
      }
    },
    showCarousel() {
      this.showAllPhoto = true;
    },
    formatHousings() {
      const a = this.housingList.map(i => ({ label: `${this.$t('housing')} ${i.id}`, value: i.id }));
      return [{ label: this.$t('all_housings'), value: 0 }, ...a];
    },
  },
  created() {
    this.$store.dispatch('rooms/fetchHousingList');
    this.$store.dispatch('rooms/fetchRoomsList');
    this.showAll();
  },
  computed: {
    ...mapState('rooms', ['roomsList', 'housingList']),
  },
};
</script>

<style lang="stylus" scoped>
  .card{
    width: 300px;
    height: 370px;
    cursor: pointer;
  }
  .image{
    width: 300px;
    height: 200px;
  }
  .small_image{
    width: 120px;
    height: 75px;
  }
  .carousel{
    width: 560px;
    height: 400px;
  }
</style>
