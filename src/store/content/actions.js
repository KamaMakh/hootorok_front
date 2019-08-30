import { axios } from 'boot/axios';
import onError from 'src/store/onError';
import {
  servicesUrl,
  newsUrl,
  getOnePageUrl,
  getAllHousingsUrl,
} from 'src/store/urls';


function getOnePage({ commit }, textId) {
  return new Promise((resolve, reject) => {
    axios.post(getOnePageUrl, { text_id: textId })
      .then((response) => {
        const payload = {
          id: textId,
          page: response.data.data,
        };

        commit('setPage', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function getNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(newsUrl, data)
      .then((response) => {
        const payload = {
          news: response.data.data,
          total: response.data.total,
        };
        commit('setNews', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

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
  getOnePage,
  getNews,
  getServices,
  getAllHousings,
};
