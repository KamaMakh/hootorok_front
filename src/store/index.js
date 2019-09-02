import Vue from 'vue';
import Vuex from 'vuex';
import { Cookies } from 'quasar';

import admin from './admin';
import user from './user';
import rooms from './rooms';
import content from './content';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ({ ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  const Store = new Vuex.Store({
    modules: {
      admin,
      user,
      rooms,
      content,
    },
    state: {
      lang: cookies.get('lang') || 'ru',
      mainTelephone: '7 (918) 190-15-17',
      coords: [44.421986, 40.739452],
    },
    getters: {
      loggedIn(state) {
        return Boolean(state.user.user.id);
      },
      isAdmin(state) {
        return Boolean(state.user.user.isAdmin);
      },
    },
    mutations: {
      setLang(state, lang) {
        cookies.set('lang', lang);

        state.lang = lang;
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./user'], () => {
      // eslint-disable-next-line
      const newAdmin = require('./admin').default;
      // eslint-disable-next-line
      const newUser = require('./user').default;
      // eslint-disable-next-line
      const newContent = require('./content').default;
      // eslint-disable-next-line
      const newRooms = require('./rooms').default;

      Store.hotUpdate({
        modules: {
          admin: newAdmin,
          user: newUser,
          content: newContent,
          rooms: newRooms,
        },
      });
    });
  }

  return Store;
}
