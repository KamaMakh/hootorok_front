import axios from 'axios';
import { servicesUrl, newsUrl } from 'src/store/urls';
import onError from 'src/store/onError';

function getNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(newsUrl, data)
      .then((response) => {
        commit('setNews', response.data.data);
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

export {
  getNews,
  getServices,
};
