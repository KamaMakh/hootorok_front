import axios from 'axios';
import { aboutInfoUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function getAboutInfo({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(aboutInfoUrl)
      .then((response) => {
        commit('setAboutInfo', response.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getAboutInfo,
};
