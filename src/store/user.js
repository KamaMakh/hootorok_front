import axios from 'axios';
import { showErrorMessage } from 'src/utils/function-show-error-message.js';
import { registerUrl } from 'src/store/urls.js';

const state = {
  user: {
    loggedIn: false,
    alreadyRegistered: false,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    tel: '',
    subscribed: false,
    id: '',
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  setLoggedIn(state, value) {
    state.user.loggedIn = value;
  },
};

const actions = {
  // eslint-disable-next-line
  register({ commit }, payload) {
    axios
      .post(registerUrl, { payload })
      .then(response => console.log(response))
      .catch((error) => {
        showErrorMessage(error.message);
      });
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
