import { axios } from 'boot/axios';
import {
  registerUrl,
  loginUrl,
  logoutUrl,
  checkAuthUrl,
  resetPasswordUrl,
  newPasswordUrl,
  RecoveryHashUrl,
} from 'src/store/urls';

import onError from 'src/store/onError';

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(registerUrl, data)
      .then((response) => {
        commit('setUser', response.data.data);

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

function logout({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(logoutUrl)
      .then(() => {
        commit('resetUser');

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function checkUser({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(checkAuthUrl)
      .then((response) => {
        const user = response.data.data;

        if (user) {
          commit('setUser', user);
        } else {
          commit('resetUser');
        }

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
  register,
  resetPassword,
  login,
  setNewPassword,
  checkRecoveryHash,
  logout,
  checkUser,
};
