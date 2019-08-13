<template>
  <q-field :label="$t('guests')" stack-label>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <span>
          {{formattedText}}
        </span>
      </div>
      <q-menu fit>
        <div class="column q-pa-sm">
          <div class="row q-pa-sm justify-between items-center">
            <div>{{ $t('adult_label') }}</div>
            <div class="q-gutter-sm row items-center">
              <q-btn round icon="remove" size="sm" @click.native="dec(adultCount)" />
              <div style="width: 1.5em" class="text-center">{{ adultCount.value }}</div>
              <q-btn round icon="add" size="sm" @click.native="inc(adultCount)" />
            </div>
          </div>
          <div class="row q-pa-sm justify-between items-center">
            <div>{{ $t('child_label') }}</div>
            <div class="q-gutter-sm row items-center">
              <q-btn round icon="remove" size="sm" @click.native="dec(childCount)" />
              <div style="width: 1.5em" class="text-center">{{ childCount.value }}</div>
              <q-btn round icon="add" size="sm" @click.native="inc(childCount)" />
            </div>
          </div>
        </div>
      </q-menu>
    </template>
  </q-field>
</template>

<script>
const adultCountMin = 1;
const childCountMin = 0;
export default {
  name: 'GuestsSelect',
  props: {
    adults: Number,
    children: Number,
    declensions: Array,
    label: String,
  },
  data() {
    return {
      adultCount: {
        value: Math.max(this.adults, adultCountMin, 0),
        min: adultCountMin,
      },
      childCount: {
        value: Math.max(this.children, childCountMin, 0),
        min: childCountMin,
      },
      maxCount: 128,
      declensionsChild: 'children',
      declensionsAdult: 'adult',
    };
  },
  computed: {
    formattedText() {
      const adult = this.wordDeclension(this.adultCount.value, this.declensionsAdult);
      const child = this.wordDeclension(this.childCount.value, this.declensionsChild);
      if (child === '') return adult;
      return [adult, child].join(', ');
    },
  },
  methods: {
    dec(counter) {
      if (counter.value > (counter.min || 0)) {
        counter.value -= 1;
        this.changeEvent();
      }
    },
    inc(counter) {
      if (counter.value < (counter.max || this.maxCount)) {
        counter.value += 1;
        this.changeEvent();
      }
    },
    changeEvent() {
      this.$emit('change', {
        adults: this.adultCount.value,
        children: this.childCount.value,
      });
    },
    wordDeclension(value, declensions) {
      if (value === 0) return '';
      if (this.$store.state.lang === 'ru') {
        const checkValue = value % 100;
        if (checkValue % 10 === 1 && checkValue !== 11) {
          return `${value} ${this.$t(declensions)[0]}`; // '1 Гость'
        }
        if (checkValue % 10 > 1 && checkValue % 10 < 5 && (checkValue < 10 || checkValue > 20)) {
          return `${value} ${this.$t(declensions)[1]}`; // '2-4 Гостя'
        }
        return `${value} ${this.$t(declensions)[2]}`; // '5-20 Гостей'
      }
      if (value === 1) return `${value} ${this.$t(declensions)[0]}`;
      return `${value} ${this.$t(declensions)[1]}`;
    },
  },
};
</script>

<style scoped>

</style>
