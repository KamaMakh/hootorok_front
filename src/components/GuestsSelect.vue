<template>
  <q-field
    dense
    :label="withLabel ? $t('guests') : undefined"
    :stack-label="withLabel"
  >
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <span v-text="formattedText"/>
      </div>
      <q-menu fit>
        <div class="column q-pa-sm">
          <div class="row q-pa-sm justify-between items-center">
            <div v-text="$t('adult_label')" class="q-mr-sm"/>
            <div class="q-gutter-sm row items-center">
              <q-btn
                round
                size="sm"
                icon="remove"
                @click.native="dec(adultCount)"
              />
              <div
                style="width: 1.5em"
                class="text-center"
                v-text="adultCount.value"
              />
              <q-btn
                round
                size="sm"
                icon="add"
                @click.native="inc(adultCount)"
              />
            </div>
          </div>
          <div class="row q-pa-sm justify-between items-center">
            <div v-text="$t('child_label')" class="q-mr-sm"/>
            <div class="q-gutter-sm row items-center">
              <q-btn
                round
                size="sm"
                icon="remove"
                @click.native="dec(childCount)"
              />
              <div
                style="width: 1.5em"
                class="text-center"
                v-text="childCount.value"
              />
              <q-btn
                round
                size="sm"
                icon="add"
                @click.native="inc(childCount)"
              />
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
    withLabel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      adultCount: {
        value: Math.max(this.adults, adultCountMin),
        min: adultCountMin,
      },
      childCount: {
        value: Math.max(this.children, childCountMin),
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
