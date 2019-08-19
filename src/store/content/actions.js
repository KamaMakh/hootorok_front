import axios from 'axios';
import { newsUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function getNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(newsUrl, data)
      .then((response) => {
        commit('setContent', response.data.body);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getNews,
};
