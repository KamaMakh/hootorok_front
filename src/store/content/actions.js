import axios from 'axios';
import { servicesUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function getServices({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(servicesUrl)
      .then((response) => {
        commit('setServices', response.data);
        console.log(response.data);
        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getServices,
};
