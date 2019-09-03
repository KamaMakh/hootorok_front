<template>
  <q-page class="text-center">
    <h1
      class="text-h5"
      v-text="$t('contacts_reseption_hutorok')"
    />
    <div>
      <h2
        class="text-h6"
        v-text="$t('how_to_get')"
      />

      <ya-map
        class="q-px-md q-my-md ya-map"
        :coords="coords"
      />

      <div class="q-pt-md flex justify-around text-justify">
        <p class="contacts-text q-px-md text-body2 text-grey-7">
          Описывается вариант с такси, как оно едет куда и почему,
          нахуа так? кого заказать. Лучше взять автобус. И так далее.
        </p>
        <p class="contacts-text q-px-md text-body2 text-grey-7">
          Вы из москвы? нужен самолёт, или нет, а может и да.
          Суть втом, что дорога дальше лучше и так далее.
        </p>
      </div>
    </div>

    <div class="q-pb-md">
      <h2
        class="text-h6"
        v-text="$t('phones_for_communication')"
      />
      <span class="block text-body2 q-pb-md text-grey-7">
        {{ $t('reception_service') }}:
        </span>

      <span
        class="block q-py-xs text-body2 text-grey-7"
        v-for="(contactNumberBooking, index) in contactNumbersBooking"
        :key="index"
        >
        <a
        class="standard-link text-primary"
        :href="`tel:+${contactNumberBooking}`"
        v-text="`${contactNumberBooking}`"
        />
      </span>
      <div class="q-py-md">
        <span
          class="block q-py-xs text-body2 text-grey-7"
          v-for="(contactNumber, index) in contactNumbers"
          :key='index'
          >
          {{ $t(`reception_service_name[${index}]`) }}:
          <a
          class="standard-link text-primary"
          :href="`tel:+${contactNumber}`"
          v-text="`+${contactNumber}`"
          />
        </span>
        <h3 class="text-subtitle1">E-mail:</h3>
        <span
          class="block q-py-xs text-body2 text-grey-7"
          v-for="(contactMail, index) in contactMails"
          :key="index"
          >
          {{ $t(`contact_emails[${index}]`) }}:
          <a
          class="standard-link text-primary"
          :href="`mailto:${contactMail}`"
          v-text="`${contactMail}`"
          />
        </span>
        <h3 class="text-subtitle1">
          {{ $t('social_networks') }}:
        </h3>
        <a
        v-for="(contactUrl, index) in contactUrls"
        class="standard-link text-default"
        :href="contactUrl"
        :key="index"
        >
        <q-icon
          name="check_circle"
          class="q-ma-xs"
          style="font-size: 5em;"/>
        </a>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import YaMap from 'components/YaMap';

export default {
  name: 'Contacts',
  components: { YaMap },
  data() {
    return {
      contactNumbersBooking: ['8(938) 412-65-28', '8(918) 692-27-28', '8(86192) 5-15-68'],
      contactNumbers: ['7(918)692-27-28', '7(918)190-15-17', '7(918)345-90-58',
        '7(918)697-49-96', '7(988)354-87-66'],
      contactMails: ['razmeshenie.hutorok@mail.ru', 'baza.hutorok@yandex.ru'],
      contactUrls: ['https://www.google.com/', 'https://www.google.com/',
        'https://www.google.com/', 'https://www.google.com/', 'https://www.google.com/'],
      slide: 0,
    };
  },
  computed: {
    ...mapState({
      coords: 'coords',
    }),
  },
};
</script>

<style lang="stylus" scoped>
.ya-map
  height 80vh
.contacts-text
  width: 90vw
  max-width: 580px
  vertical-align: top
</style>
