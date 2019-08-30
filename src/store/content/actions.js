import axios from 'axios';
import onError from 'src/store/onError';
import {
  servicesUrl,
  getAllHousingsUrl,
} from 'src/store/urls';


function getServices({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(servicesUrl)
      .then((response) => {
        commit('setServices', response.data.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function getAllHousings({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(getAllHousingsUrl, data).then((response) => {
      commit('setHousings', response.data.data);

      resolve();
    }).catch(error => onError(error, reject));
  });
}

export {
  getServices,
  getAllHousings,
};
