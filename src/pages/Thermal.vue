<template>
  <q-page class="q-px-md q-pb-md">
    <h2 class="text-h2 text-center" v-text="$t('thermal.title')"/>
    <div class="q-pa-md">
      <q-table :title="$t('thermal.table.title')" :columns="columns" :data="data" row-key="name"/>
    </div>
    <p class="q-pa-md text-body1">
      Абзац посвящённый описанию и характеристикам бассейнов.
    </p>
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-next="scale"
        transition-prev="scale"
        animated
        control-color="white"
        navigation
        padding
        arrows
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="waterpool-1" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            Фото бассейна 1
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="waterpool-2" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            Фото бассейна 2
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="waterpool-3" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
             Фото бассейна 3
          </div>
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
          label: 'Параметр',
          field: 'parameter',
          align: 'left',
        },
        {
          name: 'value',
          label: 'Значение',
          field: 'value',
          align: 'left',
        },
      ],
      data: [], // TODO получить данные с сервера
      slide: 'waterpool-1',
    };
  },
  mounted() {
  },
};
</script>
