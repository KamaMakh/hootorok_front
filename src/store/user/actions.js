import axios from 'axios';
import {
  registerUrl, resetPasswordUrl, loginUrl, newPasswordUrl, RecoveryHashUrl,
} from 'src/store/urls';

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
        commit('setUser', response.data.user);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function setNewPassword(data) {
  return new Promise((resolve, reject) => {
    axios.post(newPasswordUrl, data)
      .then((response) => {
        console.log(response);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function checkRecoveryHash(data) {
  return new Promise((resolve, reject) => {
    axios.post(RecoveryHashUrl, data)
      .then((response) => {
        console.log(response);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  register, resetPassword, login, setNewPassword, checkRecoveryHash,
};
