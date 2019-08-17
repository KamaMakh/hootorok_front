import axios from 'axios';
import { registerUrl, servicesUrl } from 'src/store/urls';

import onError from 'src/store/onError';


function getServices({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(servicesUrl)
      .then((response) => {
        commit('updateServices', response.data);
        resolve();
      })
      .catch(error => onError(error, reject));
  });
}


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

export {
  register,
  getServices,
};
