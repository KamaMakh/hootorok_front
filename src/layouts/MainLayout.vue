<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title />

        <div class="row items-center">
          <template v-if="loggedIn">
            <router-link
              :to="{ name: 'cabinet' }"
              class="standard-link text-white q-ml-md"
              v-text="$t('cabinet')"
            />
            <router-link
              :to="{ name: 'logout' }"
              class="standard-link text-white q-ml-md"
              v-text="$t('logout')"
            />
          </template>
          <template v-else>
            <router-link
              :to="{ name: 'login' }"
              class="standard-link text-white q-ml-md"
              v-text="$t('login')"
            />
            <router-link
              :to="{ name: 'registration' }"
              class="standard-link text-white q-ml-md"
              v-text="$t('registration')"
            />
          </template>
          <q-select
            v-model="lang"
            :options="langOptions"
            dense
            borderless
            emit-value
            map-options
            options-dense
            :dark="true"
            class="q-ml-md"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list dense>
        <q-item-label header v-text="$t('cabinet')"/>
        <q-item class="items-center" :to="{ name: 'cabinet' }">
          <q-item-label v-text="$t('profile')"/>
        </q-item>
        <q-item-label header v-text="$t('recreation_center')"/>
        <q-item class="items-center" :to="{ name: 'news' }">
          <q-item-label v-text="$t('news_and_campaigns')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'services' }">
          <q-item-label v-text="$t('list_of_services')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'housings' }">
          <q-item-label v-text="$t('housing_facilities')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'rooms' }">
          <q-item-label v-text="$t('rooms_and_houses')"/>
        </q-item>
        <q-item-label header v-text="$t('info')"/>
        <q-item class="items-center" :to="{ name: 'contacts' }">
          <q-item-label v-text="$t('contacts')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'about' }">
          <q-item-label v-text="$t('about')"/>
        </q-item>
        <q-item class="items-center" :to="{ name: 'info' }">
          <q-item-label v-text="$t('support_center')"/>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <q-footer elevated class="text-left q-pa-md">
        <div class="row items-center justify-center text-center q-gutter-md">
          <router-link
            :to="{ name: 'contacts'}"
            class="standard-link text-white"
            v-text="$t('contacts')"
          />
          <router-link
            :to="{ name: 'about'}"
            class="standard-link text-white"
            v-text="$t('about')"
          />
          <router-link
            :to="{ name: 'info'}"
            class="standard-link text-white"
            v-text="$t('support_center')"
          />
        </div>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      langOptions: [{
        label: 'RU',
        value: 'ru',
      }, {
        label: 'EN',
        value: 'en-us',
      }],
    };
  },
  computed: {
    lang: {
      get() {
        return this.$store.state.lang;
      },
      set(lang) {
        this.$i18n.locale = lang;
        import(`quasar/lang/${lang}`).then((l) => {
          this.$q.lang.set(l.default);
        });
        this.$store.commit('setLang', lang);
      },
    },
    ...mapGetters(['loggedIn']),
  },
  methods: {
    openURL,
  },
};
</script>
