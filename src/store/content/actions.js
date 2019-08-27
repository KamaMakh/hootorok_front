import axios from 'axios';
import { getOnePageUrl } from '../urls';


function getOnePage({ commit }, textId) {
  return new Promise((resolve, reject) => {
    axios.post(getOnePageUrl, { text_id: textId }).then((response) => {
      commit('setPage', response.data.data);
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}


export {
  getOnePage,
};
