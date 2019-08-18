import axios from 'axios';
import { servicesUrl } from 'src/store/urls';

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

export {
  getServices,
};
