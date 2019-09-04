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
          Описывается вариант с такси, как оно едет, куда и почему.
          Хотя зачем такси? Ведь можно взять автобус. Личный.
        </p>
        <p class="contacts-text q-px-md text-body2 text-grey-7">
          Вы из Москвы? Нужен самолёт. Личный. Нет? Так идите пешком, чего же вы ждёте?
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
        v-for="(n, index) in bookingNumbers"
        :key="index"
      >
        <a
          class="standard-link text-primary"
          :href="`tel:+${n}`"
          v-text="`${n}`"
        />
      </span>

      <div class="q-py-md">
        <span
          class="block q-py-xs text-body2 text-grey-7"
          v-for="n in contactNumbers"
          :key='n.title'
        >
          {{ n.title }}:
          <a
            class="standard-link text-primary text-no-wrap"
            :href="`tel:+${n.phone}`"
            v-text="`+${n.phone}`"
          />
        </span>

        <h3 class="text-subtitle1">E-mail:</h3>

        <span
          class="block q-py-xs text-body2 text-grey-7"
          v-for="m in contactMails"
          :key="m.id"
        >
          {{ $t(m.id) }}:
          <a
            class="standard-link text-primary"
            :href="`mailto:${m.email}`"
            v-text="$t(m.id)"
          />
        </span>

        <h3 class="text-subtitle1">
          {{ $t('social_networks') }}:
        </h3>
        <a
          v-for="s in socials"
          class="standard-link text-default"
          :href="s.link"
          :key="s.id"
        >
          <q-icon
            name="check_circle"
            class="q-ma-xs"
            style="font-size: 3em;"
          />
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
      bookingNumbers: [
        '8 (938) 412-65-28',
        '8 (918) 692-27-28',
        '8 (86192) 5-15-68',
      ],
      contactNumbers: [
        {
          title: 'WhatsApp',
          phone: '7 (918) 692-27-28',
        },
        {
          title: 'ИП Ключко О.В. 1-й корпус',
          phone: '7 (918) 190-15-17',
        },
        {
          title: 'ИП Просвирякова И.А. 2-й корпус',
          phone: '7 (918) 345-90-58',
        },
        {
          title: 'ИП Просвирякова И.А. 3-й корпус',
          phone: '7 (918) 697-49-96',
        },
        {
          title: 'ИП Санжарова Э.Е. закусочная "Харчевня"',
          phone: '7 (988) 354-87-66',
        },
      ],
      contactMails: [
        {
          id: 'for_questions_about_booking',
          email: 'razmeshenie.hutorok@mail.ru',
        },
        {
          id: 'for_other_reasons',
          email: 'baza.hutorok@yandex.ru',
        },
      ],
      socials: [
        {
          id: 'vk',
          link: 'https://www.vk.com/',
        },
        {
          id: 'odnoklassniki',
          link: 'https://www.ok.ru/',
        },
        {
          id: 'instagram',
          link: 'https://www.instagram.com/',
        },
        {
          id: 'telegram',
          link: 'https://www.telegram.org/',
        },
        {
          id: 'twitter',
          link: 'https://www.twitter.com/',
        },
      ],
      slide: 0,
    };
  },
  computed: {
    ...mapState(['coords']),
  },
};
</script>

<style lang="stylus" scoped>
.ya-map
  height 80vh
.contacts-text
  width: 90vw
  max-width: 580px
</style>
