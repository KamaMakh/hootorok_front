<template>
  <q-page padding>
    <h1 class="text-h2 text-center" v-text="$t('room_or_house_choice')"/>
    <div class="row justify-center items-center">
      <div class="row no-wrap items-center">
        <span v-text="$t('arrival_date')"/>
        <q-input
          dense
          readonly
          v-model="fromDate"
          class="q-mx-md"
          style="max-width: 120px;"
          @click="() => $refs.fromDate.show()"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="fromDate" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="fromDate"
                  mask="DD.MM.YYYY"
                  :options="fromDateOptions"
                  @input="onFromDateInput"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="row no-wrap items-center">
        <span v-text="$t('departure_date')"/>
        <q-input
          dense
          readonly
          v-model="toDate"
          class="q-mx-md"
          style="max-width: 120px;"
          @click="() => $refs.toDate.show()"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="toDate" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="toDate"
                  mask="DD.MM.YYYY"
                  :options="toDateOptions"
                  @input="() => $refs.toDate.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="row no-wrap items-center">
        <span v-text="$t('guests')"/>
        <guests-select
          :adults="adultsCount"
          :children="childrenCount"
          @change="onGuestsChange"
          :with-label="false"
          class="q-mx-md"
        />
      </div>
      <q-btn
        size="sm"
        color="primary"
        :label="$t('search')"
        class="q-mx-md"
        @click="getRooms"
        :disabled="!fromDate || !toDate"
      />
    </div>
    <div class="row items-start q-pb-md">
      <room-card
        v-for="room in freeRooms"
        :key="room.id"
        :room="room"
        @show-photos="showPhotos"
      >
        <template v-slot:actions>
          <q-card-actions class="justify-end">
            <q-btn
              size="sm"
              color="primary"
              :label="$t('book')"
              @click="addBooking(room)"
            />
          </q-card-actions>
        </template>
      </room-card>
    </div>
    <q-dialog
      v-model="showCarousel"
      maximized
      class="relative"
    >
      <div class="full-width full-height">
        <q-carousel
          v-model="slide"
          arrows
          navigation
          infinite
          class="full-height full-width"
        >
          <q-carousel-slide
            v-for="(image, index) in photos"
            :img-src="image"
            :key="index"
            :name="index + 1"
          />
        </q-carousel>
        <q-btn
          flat
          icon="close"
          class="absolute-top-right"
          color="white"
          style="z-index: 10000;"
          @click="showCarousel = false"
        />
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapState, mapGetters } from 'vuex';
import GuestsSelect from 'components/GuestsSelect.vue';
import RoomCard from 'components/RoomCard.vue';

const dateFormat = 'DD.MM.YYYY';

function dateStringToTimestamp(dateString) {
  const dateObj = date.extractDate(dateString, dateFormat);

  return date.formatDate(dateObj, 'X');
}

export default {
  name: 'Booking',
  props: {
    arrivalDate: String,
    departureDate: String,
    adults: Number,
    children: Number,
  },
  preFetch({ currentRoute, store }) {
    const {
      arrivalDate,
      departureDate,
      adults,
      children,
    } = currentRoute.params;

    if (arrivalDate && departureDate
      && !Number.isNaN(adults)
      && !Number.isNaN(children)) {
      return store.dispatch('rooms/getFreeRooms', {
        startDate: dateStringToTimestamp(arrivalDate),
        endDate: dateStringToTimestamp(departureDate),
        capacity: adults + children,
      });
    }

    return Promise.resolve();
  },
  data() {
    return {
      fromDate: this.arrivalDate,
      toDate: this.departureDate,
      adultsCount: this.adults || 1,
      childrenCount: this.children || 0,
      today: date.adjustDate(new Date(), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      selectedRoom: null,
      showBooking: false,
      showCarousel: false,
      slide: 1,
      photos: [],
    };
  },
  computed: {
    ...mapGetters(['loggedIn']),
    ...mapState({
      freeRooms: state => state.rooms.freeRooms,
      user: state => state.user.user,
    }),
  },
  methods: {
    getRooms() {
      this.$store.dispatch('rooms/getFreeRooms', {
        startDate: dateStringToTimestamp(this.fromDate),
        endDate: dateStringToTimestamp(this.toDate),
        capacity: this.adultsCount + this.childrenCount,
      }).catch((error) => {
        this.$q.notify({
          icon: 'close',
          color: 'negative',
          message: error,
        });
      });
    },
    addBooking(room) {
      if (!this.loggedIn) {
        return this.$router.push({ name: 'login' });
      }

      // TODO: improve logic because dates can be changed
      // this.selectedRoom = room;
      // this.showBooking = true;

      return this.$store.dispatch('user/addBooking', {
        room: room.id,
        user: this.user.id,
        start_date: dateStringToTimestamp(this.fromDate),
        end_date: dateStringToTimestamp(this.toDate),
      });
    },
    onGuestsChange(data) {
      this.adultsCount = data.adults;
      this.childrenCount = data.children;
    },
    toDateOptions(dateString) {
      const tomorrowDate = date.addToDate(this.today, { days: 1 });
      const iterDate = date.extractDate(dateString, 'YYYY/MM/DD');
      const moreThanTomorrow = +iterDate > +tomorrowDate;

      if (!this.fromDate) return moreThanTomorrow;

      const fromDate = date.extractDate(this.fromDate, dateFormat);
      const moreThanFromDate = +iterDate > +fromDate;

      return moreThanFromDate;
    },
    fromDateOptions(dateString) {
      const iterDate = date.extractDate(dateString, 'YYYY/MM/DD');
      const moreThanToday = +iterDate >= +this.today;

      return moreThanToday;
    },
    onFromDateInput(fromDate) {
      if (!this.toDate || fromDate >= this.toDate) {
        let nextDate = date.extractDate(fromDate, dateFormat);
        nextDate = date.addToDate(nextDate, { days: 1 });

        this.toDate = date.formatDate(nextDate, dateFormat);
      }

      this.$refs.fromDate.hide();
    },
    showPhotos(photos) {
      this.photos = photos;
      this.slide = 1;

      this.showCarousel = true;
    },
  },
  beforeDestroy() {
    this.$store.commit('rooms/resetFreeRooms');
  },
  components: {
    GuestsSelect,
    RoomCard,
  },
};
</script>
