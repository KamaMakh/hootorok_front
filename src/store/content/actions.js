import axios from 'axios';
import { newsUrl } from 'src/store/urls';

import onError from 'src/store/onError';
import { servicesUrl } from 'src/store/urls';

function getNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(newsUrl, data)
      .then((response) => {
        commit('setContent', response.data.body);


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
