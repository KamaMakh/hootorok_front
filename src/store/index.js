import Vue from 'vue';
import Vuex from 'vuex';
import { Cookies } from 'quasar';

import user from './user';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ({ ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  const Store = new Vuex.Store({
    modules: {
      user,
    },
    state: {
      lang: cookies.get('lang') || 'ru',
    },
    getters: {
      loggedIn(state) {
        return Boolean(state.user.user.id);
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
      const newUser = require('./user').default;

      Store.hotUpdate({
        modules: {
          user: newUser,
        },
      });
    });
  }

  return Store;
}
