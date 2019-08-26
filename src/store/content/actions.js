import axios from 'axios';
import { onePageUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function getOnePage({ commit }, textId) {
  return new Promise((resolve, reject) => {
    axios.post(onePageUrl, {
      text_id: textId,
    })
      .then((response) => {
        commit('setOnePage', response.data.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getOnePage,
};
