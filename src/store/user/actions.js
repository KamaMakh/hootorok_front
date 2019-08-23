import axios from 'axios';
import { registerUrl, resetPasswordUrl, loginUrl } from 'src/store/urls';
import onError from 'src/store/onError';

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(registerUrl, data)
      .then((response) => {
        commit('setUser', response.data.user[0]);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function resetPassword(data) {
  return new Promise((resolve, reject) => {
    axios.post(resetPasswordUrl, data)
      .then((response) => {
        console.log(response);
        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function login({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(loginUrl, data)
      .then((response) => {
        commit('setUser', response.data.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  register, resetPassword, login,
};
