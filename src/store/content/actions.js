import axios from 'axios';
import { onePageUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function getPage({ commit }, textId) {
  return new Promise((resolve, reject) => {
    axios.post(onePageUrl, {
      text_id: textId,
    })
      .then((response) => {
        const payload = {
          id: textId,
          page: response.data.data,
        };
        commit('setOnePage', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getPage,
};
