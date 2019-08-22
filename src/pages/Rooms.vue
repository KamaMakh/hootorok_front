<template>
  <q-page padding>
    <h1 class="text-h2 text-center" v-text="$t('roomsAndHouses')"/>
    <div class="row">
      <div class="q-pa-md col-xs-12 col-sm-4 col-md-2">
        <q-btn
          @click="sortArray"
          color="primary"
          :label="$t('sortByPricePerDay')">
        </q-btn>
        <q-option-group
          v-model="group"
          :options="housing"
          color="primary"
          @input="group === 0 ? showAll() : filterData(group)">
        </q-option-group>
        <q-btn-toggle
          v-model="isList"
          size="sm"
          push
          glossy
          toggle-color="primary"
          :options="[
          {label: $t('tile'), value: false},
          {label: $t('list'), value: true},
        ]">
        </q-btn-toggle>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-10">
        <div class="q-pa-md row items-start q-gutter-md" v-if="!isList">
          <q-card class="card" v-for="item in result" :key="item.id">
            <img :src="item.img" class="image">
            <q-card-section>
              <div class="text-h6"
                   @click="$router.push({
                  name: 'roomItem',
                  params: {
                  id: item.id,
                  },
                  })"
              >{{$t('roomNumber')}}{{item.id}}</div>
              <div class="text-h6">{{$t('housing')}}{{item.housing}}</div>
            </q-card-section>
            <q-card-section>
              <p>{{$t('pricePerDay')}}{{item.price}}</p>
              <p>{{$t('person')}}{{item.max}}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md" v-else>
          <q-markup-table>
            <thead>
            <tr>
              <th class="text-left">{{$t('photo')}}</th>
              <th class="text-right">{{$t('roomNumber')}}</th>
              <th class="text-right">{{$t('housing')}}</th>
              <th class="text-right">{{$t('pricePerDay')}}</th>
              <th class="text-right">{{$t('person')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <tr v-for="item in result" :key="item.id"
                @click="$router.push({
                name: 'roomItem',
                params: {
                id: item.id,
                },
                })">
              <td class="text-left">
                  <img :src="item.img" class="small_image">
              </td>
              <td class="text-right">{{item.id}}</td>
              <td class="text-right">{{item.housing}}</td>
              <td class="text-right">{{item.price}}</td>
              <td class="text-right">{{item.max}}</td>
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
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 1,
          price: 7500,
          housing: 1,
          max: 4,
        },
        {
          name: 'Номер 2',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 2,
          price: 1500,
          housing: 1,
          max: 5,
        },
        {
          name: 'Номер 3',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 3,
          price: 250,
          housing: 2,
          max: 4,
        },
        {
          name: 'Номер 4',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 4,
          price: 300,
          housing: 3,
          max: 3,
        },
        {
          name: 'Номер 5',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 5,
          price: 1500,
          housing: 2,
          max: 4,
        },
        {
          name: 'Номер 6',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 6,
          price: 500,
          housing: 3,
          max: 6,
        },
        {
          name: 'Номер 7',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 7,
          price: 2500,
          housing: 1,
          max: 2,
        },
        {
          name: 'Номер 8',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          id: 8,
          price: 1500,
          housing: 1,
          max: 3,
        },
      ],
      result: [],
      isSort: false,
      isList: false,
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
      } else {
        this.result.sort((a, b) => b.price - a.price);
        this.isSort = !this.isSort;
      }
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
    height: 320px ;
  }
  .image{
    width: 250px;
    height: 150px;
  }
  .small_image{
    width: 120px;
    height: 75px;
  }
</style>
