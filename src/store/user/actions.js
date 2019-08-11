import axios from 'axios';
import { registerUrl, resetPasswordUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(registerUrl, data)
      .then((response) => {
        commit('setUser', response.data.user);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function resetPassword({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(resetPasswordUrl, data)
      .then(() => {
        commit('resetUser');

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  register, resetPassword,
};
