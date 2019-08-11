<template>
  <q-card class="my-card q-pa-md" style="width: 390px">
    <q-card-section>
      <div class="text-h6">{{$t('bookingCardLabel')}}</div>
    </q-card-section>
    <q-card-actions class="q-pa-md column q-col-gutter-y-md">
      <div class="row justify-between q-col-gutter-x-md">
        <q-field class="col" :label="$t('arrivalDate')" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{arrivalDate}}
            </div>
            <q-menu anchor="bottom left" self="top left" :offset="[100, 0]">
              <q-date
                v-model="arrivalDate"
                mask="DD.MM.YYYY"
                today-btn
                :options="optionsFn1"
                @input="check || setDepartureDate()"
              />
            </q-menu>
          </template>
          <template v-slot:prepend>
            <q-icon name="event">
            </q-icon>
          </template>
        </q-field>
        <q-field class="col" :label="$t('departureDate')" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{departureDate}}
            </div>
            <q-menu anchor="bottom left" self="top left" :offset="[100, 0]">
              <q-date
                v-model="departureDate"
                mask="DD.MM.YYYY"
                :options="optionsFn2"
                @input="check || setArrivalDate()"
              />
            </q-menu>
          </template>
          <template v-slot:prepend>
            <q-icon name="event">
            </q-icon>
          </template>
        </q-field>
      </div>
      <DropdownMenu
        :items="guests"
        :declensions="guestsDeclension"
        :label="$t('guestsLabel')"
      />
      <q-btn
        class="q-mt-lg"
        color="primary"
        :label="$t('checkPrices')"
        @click="submit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { date as qDate } from 'quasar';
import DropdownMenu from './DropdownMenu';

export default {
  name: 'BookingCard',
  components: {
    DropdownMenu,
  },
  data() {
    return {
      check: false,
      arrivalDate: '',
      departureDate: '',
      maxDate: '2035/12/31',
      guests: [
        {
          label: 'adult',
          count: 0,
          min: 1,
        },
        {
          label: 'children',
          count: 0,
        },
      ],
      guestsDeclension: ['guest', 'guest2_4', 'guest5_9'],
    };
  },
  mounted() {
    // this.arrivalDate = this.today();
    // this.departureDate = this.nextDay(this.arrivalDate);
  },
  methods: {
    dateFormat(date) {
      return date.split('.').reverse().join('/');
    },
    optionsFn1(date) {
      return date >= this.dateFormat(this.today())
        && date < (this.dateFormat(this.departureDate) || this.maxDate);
    },
    optionsFn2(date) {
      return date >= this.dateFormat(this.nextDay(this.arrivalDate || this.today()))
        && date < this.maxDate;
    },
    today() {
      const date = new Date();
      return qDate.formatDate(date, 'DD.MM.YYYY');
    },
    nextDay(date) {
      const [day, mouth, year] = date.split('.');
      const nextDate = new Date(year, mouth - 1, Number(day) + 1);
      return qDate.formatDate(nextDate, 'DD.MM.YYYY');
    },
    setDepartureDate() {
      this.departureDate = this.nextDay(this.arrivalDate);
      this.check = true;
    },
    setArrivalDate() {
      this.arrivalDate = this.nextDay(this.arrivalDate);
      this.check = true;
    },
    submit() {
      this.$router.push({
        name: 'booking',
        params: {
          arrivalDate: this.arrivalDate,
          departureDate: this.departureDate,
          guests: this.guests,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
