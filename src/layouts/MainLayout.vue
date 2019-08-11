<template>
  <q-layout view="lHh Lpr lFf">
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
          <router-link
            :to="{ name: 'auth' }"
            class="standard-link text-white q-ml-md"
            v-text="$t('login')"
          />
          <router-link
            :to="{ name: 'registration' }"
            class="standard-link text-white q-ml-md"
            v-text="$t('registration')"
          />
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
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <footer elevated class="bg-primary text-left q-py-lg q-px-md shadow-6">
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
            v-text="$t('info')"
          />
        </div>
      </footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
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
  },
  methods: {
    openURL,
  },
};
</script>
