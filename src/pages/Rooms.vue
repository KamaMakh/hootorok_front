<template>
  <q-page padding>
    <h1 class="text-h2 text-center" v-text="$t('rooms_and_houses')"/>
    <div class="row">
      <div class="q-pa-md col-xs-12 col-sm-4 col-md-3">
        <q-btn
          @click="sortArray"
          color="primary"
          :label="$t('sort_by_price_per_day')">
          <q-icon :name="this.iconBtn"/>
        </q-btn>
        <q-option-group
          v-model="group"
          :options="housing"
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
            <img :src="item.img[0]" class="image" @click="showCarousel(item)">
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
              <p>{{$t('price_per_day')}}{{item.price}}</p>
              <p>{{$t('number_of_adults_and_children')}}{{item.max}}</p>
            </q-card-section>
            <q-dialog v-model="item.showAllPhoto" >
              <div class="carousel">
                <q-carousel
                  animated
                  v-model="item.slide"
                  arrows
                  navigation
                  infinite
                >
                  <q-carousel-slide
                    v-for="(image, index) in item.img"
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
                  <img :src="item.img[0]" class="small_image" @click="showCarousel(item)">
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
              <td class="text-right">{{item.price}}</td>
              <td class="text-right">{{item.max}}</td>
              <q-dialog v-model="item.showAllPhoto" >
                <div class="carousel">
                  <q-carousel
                    animated
                    v-model="item.slide"
                    arrows
                    navigation
                    infinite
                  >
                    <q-carousel-slide
                      v-for="(image, index) in item.img"
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
export default {
  name: 'Rooms',
  data() {
    return {
      rooms: [
        {
          name: 'Номер 1',
          img: ['https://cdn.quasar.dev/img/mountains.jpg',
            'https://cdn.quasar.dev/img/parallax2.jpg',
            'https://cdn.quasar.dev/img/parallax1.jpg'],
          id: 1,
          price: 7500,
          housing: 1,
          max: 4,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 2',
          img: [
            'https://cdn.quasar.dev/img/parallax2.jpg',
            'https://cdn.quasar.dev/img/mountains.jpg',
          ],
          id: 2,
          price: 1500,
          housing: 1,
          max: 5,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 3',
          img: [
            'https://cdn.quasar.dev/img/mountains.jpg',
            'https://cdn.quasar.dev/img/parallax1.jpg',
          ],
          id: 3,
          price: 250,
          housing: 2,
          max: 4,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 4',
          img: [
            'https://cdn.quasar.dev/img/parallax1.jpg',
            'https://cdn.quasar.dev/img/quasar.jpg',
          ],
          id: 4,
          price: 300,
          housing: 3,
          max: 3,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 5',
          img: [
            'https://cdn.quasar.dev/img/parallax2.jpg',
            'https://cdn.quasar.dev/img/parallax2.jpg',
            'https://cdn.quasar.dev/img/mountains.jpg',
          ],
          id: 5,
          price: 1500,
          housing: 2,
          max: 4,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 6',
          img: [
            'https://cdn.quasar.dev/img/mountains.jpg',
            'https://cdn.quasar.dev/img/parallax1.jpg',
          ],
          id: 6,
          price: 500,
          housing: 3,
          max: 6,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 7',
          img: [
            'https://cdn.quasar.dev/img/quasar.jpg',
            'https://cdn.quasar.dev/img/mountains.jpg',
          ],
          id: 7,
          price: 2500,
          housing: 1,
          max: 2,
          showAllPhoto: false,
          slide: 1,
        },
        {
          name: 'Номер 8',
          img: [
            'https://cdn.quasar.dev/img/parallax1.jpg',
            'https://cdn.quasar.dev/img/mountains.jpg',
            'https://cdn.quasar.dev/img/parallax1.jpg',
          ],
          id: 8,
          price: 1500,
          housing: 1,
          max: 3,
          showAllPhoto: false,
          slide: 1,
        },
      ],
      result: [],
      isSort: true,
      view: 'one',
      group: 0,
      housing: [
        {
          label: 'Все корпуса',
          value: 0,
        },
        {
          label: 'Первый корпус',
          value: 1,
        },
        {
          label: 'Второй корпус',
          value: 2,
        },
        {
          label: 'Дом пасечника',
          value: 3,
        },
      ],
      iconBtn: 'arrow_upward',
    };
  },
  methods: {
    showAll() {
      this.result = this.rooms;
    },
    filterData(index) {
      this.result = this.rooms.filter(obj => obj.housing === index);
    },
    sortArray() {
      if (this.isSort) {
        this.result.sort((a, b) => a.price - b.price);
        this.isSort = !this.isSort;
        this.iconBtn = 'arrow_downward';
      } else {
        this.result.sort((a, b) => b.price - a.price);
        this.isSort = !this.isSort;
        this.iconBtn = 'arrow_upward';
      }
    },
    showCarousel(obj) {
      obj.showAllPhoto = true;
      console.log('id', obj);
    },
  },
  created() {
    this.showAll();
  },
};
</script>

<style lang="stylus" scoped>
  .card{
    width: 250px;
    height: 320px;
    cursor: pointer;
  }
  .image{
    width: 250px;
    height: 150px;
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
