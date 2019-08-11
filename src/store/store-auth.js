// import axios from 'axios';
import { showErrorMessage } from 'src/utils/function-show-error-message.js';
import { Cookies } from 'quasar';

const state = {
  user: {
    loggedIn: false,
    alreadyRegistered: false,
    email: '',
    password: '',
    name: '',
    surname: '',
    tel: '',
    subscribed: false,
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  setLoggedIn(state, value) {
    state.user.loggedIn = value;
  },
};

const actions = {
  async loginUser({ commit }, payload) {
    try {
      // const response = await axios.post('здесь мне нужен адрес api', { payload })
      // const data = response.data
      // console.log(data);
      // this.$router.push('/booking');
      commit('setLoggedIn', true);
      Cookies.set('credentials', 'loggedIn', {
        secure: false,
        path: '/',
      });
      // const cookies = Cookies.getAll();
      console.log(payload);
    } catch (error) {
      console.log(error);
      // popup with the error
      showErrorMessage(error.message);
    }
  },
  handleAuthState({ commit }) {
    if (state.loggedIn) {
      commit('setLoggedIn', true);
      this.$router.push('/booking');
    }
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  loggedIn(state) {
    return Boolean(state.user.id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
