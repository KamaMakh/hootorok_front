<template>
  <q-page padding>
    <h1 class="text-h2 text-center">Номера и домики</h1>
    <div class="row">
      <div class="q-pa-md col-xs-12 col-sm-4 col-md-2">
        <q-btn @click="sortArray" color="primary" label="Сортировка по цене за сутки"></q-btn>
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
          {label: 'плитка', value: false},
          {label: 'список', value: true},
        ]">
        </q-btn-toggle>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-10">
        <div class="q-pa-md row items-start q-gutter-md" v-if="!isList">
          <q-card class="card" v-for="item in result" :key="item.id">
            <img :src="item.img" class="image" @click="() => {console.log('click')}">
            <q-card-section>
              <div class="text-h6">{{item.name}}</div>
              <div class="text-h6">Корпус № {{item.housing}}</div>
            </q-card-section>
            <q-card-section>
              <p>Цена за ночь {{item.price}}</p>
              <p>Кол-во взрослых и детей: {{item.max}}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md" v-else>
          <q-markup-table>
            <thead>
            <tr>
              <th class="text-left">Фото</th>
              <th class="text-right">Номер</th>
              <th class="text-right">Корпус</th>
              <th class="text-right">Стоимость за сутки</th>
              <th class="text-right">Максимальное кол-во взрослых</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <tr v-for="room in result" :key="room.id">
              <td class="text-left">photo</td>
              <td class="text-right">{{room.name}}</td>
              <td class="text-right">{{room.housing}}</td>
              <td class="text-right">{{room.price}}</td>
              <td class="text-right">{{room.max}}</td>
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
</style>
