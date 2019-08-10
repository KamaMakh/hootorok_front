// import axios from 'axios';
// import { showErrorMessage } from 'src/utils/function-show-error-message.js';

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
  // async registerUser({ commit }, payload) {
  //   try {
  //     const response = await axios.post('здесь мне нужен адрес api', { payload })
  //     const data = response.data
  //     commit('setLoggedIn', true);
  //     this.$router.push('/booking');
  //     console.log(payload);
  //   } catch (error) {
  //     console.log(error);
  //     // popup with the error
  //     showErrorMessage(error.message);
  //   }
  // },
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
