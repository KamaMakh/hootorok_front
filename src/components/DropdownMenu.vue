<template>
  <q-field :label="label" stack-label>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ wordDeclension }}
      </div>
      <q-menu fit>
        <div class="column">
          <div class="row q-pa-md justify-between items-center" v-for="(item, i) in items" :key="i">
            <div>{{ $t(item.label) }}</div>
            <div class="q-gutter-sm row items-center">
              <q-btn round label="-" size="sm" @click.native="dec(item)" />
              <div>{{ item.count }}</div>
              <q-btn round label="+" size="sm" @click.native="inc(item)" />
            </div>
          </div>
        </div>
      </q-menu>
    </template>
  </q-field>
</template>

<script>
export default {
  name: 'DropdownMenu',
  props: {
    items: Array,
    declensions: Array,
    label: String,
    value: String,
  },
  computed: {
    counter() {
      if (this.items) {
        return this.items.reduce((sum, item) => sum + item.count, 0);
      }
      return '';
    },
    wordDeclension() {
      const value = this.counter;
      const checkValue = value % 100;
      if (checkValue % 10 === 1 && checkValue !== 11) {
        return `${value} ${this.$t(this.declensions[0])}`; // '1 Гость'
      } if (checkValue % 10 > 1 && checkValue % 10 < 5 && (checkValue < 10 || checkValue > 20)) {
        return `${value} ${this.$t(this.declensions[1])}`; // '2-4 Гостя'
      }
      return `${value} ${this.$t(this.declensions[2])}`; // '5-20 Гостей'
    },
  },
  created() {
    if (this.items) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.items) {
        if (item.min) item.count = item.min;
      }
    }
  },
  methods: {
    dec(item) {
      if (item.count > (item.min || 0)) {
        item.count -= 1;
      }
    },
    inc(item) {
      if (item.count < (item.max || 128)) {
        item.count += 1;
      }
    },
  },
};
</script>

<style scoped>

</style>
