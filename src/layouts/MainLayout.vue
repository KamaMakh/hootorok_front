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
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title/>

        <div class="row items-center">
          <div v-if="isAuth">
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
          </div>
          <div v-else>
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
          </div>
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

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
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

      <footer
        class="bg-white text-default q-py-lg q-px-md shadow-6"
      >
        <div
          class="flex column items-center q-gutter-y-md"
          v-text="'Footer'"
        />
      </footer>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, Dialog } from 'quasar';
import axios from 'axios';

export default {
  name: 'MainLayout',
  data() {
    return {
      isAuth: false,
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
  beforeRouteEnter(to, from, next) {
    next(vm => vm.isAuth = true);
    // Promise.all([axios.get('api address/auth/check')])
    //   .then((values) => {
    //     next(vm => vm.checkAuth(values[0]));
    //   })
    //   .catch((error) => {
    //     next(vm => vm.showErrorMessage(error));
    //   });
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
    checkAuth(info) {
      this.isAuth = info.data;
    },
    showErrorMessage(errorMessage) {
      Dialog.create({
        title: 'Error',
        message: 'Что-то пошло не так',
      });
    },
    openURL,
  },
};
</script>
