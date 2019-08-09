import Vue from 'vue';
import Vuex from 'vuex';
import { Cookies } from 'quasar';

import auth from './store-auth';

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ({ ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  const Store = new Vuex.Store({
    modules: {
      auth,
    },
    state: {
      lang: cookies.get('lang') || 'ru',
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

  return Store;
}
