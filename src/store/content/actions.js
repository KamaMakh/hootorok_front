import { axios } from 'boot/axios';
import onError from 'src/store/onError';
import {
  servicesUrl,
  newsUrl,
  onePageUrl,
  oneNewsUrl,
  sendFeedbackUrl,
  faqUrl,
  feedbacksUrl,
  infoPagesUrl,
} from 'src/store/urls';


function getOnePage({ commit }, textId) {
  return new Promise((resolve, reject) => {
    axios.post(onePageUrl, { text_id: textId })
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
        const payload = {
          services: response.data.data,
          total: response.data.total,
        };
        commit('setServices', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function getOneNews({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.post(oneNewsUrl, { id })
      .then((response) => {
        commit('setOneNews', response.data.data);

        resolve();
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          commit('resetOneNews');

          resolve();

          return;
        }

        onError(error, reject);
      });
  });
}

function getFAQ({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(faqUrl)
      .then((response) => {
        commit('setFAQ', response.data.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function sendFeedback(context, data) {
  return new Promise((resolve, reject) => {
    axios.post(sendFeedbackUrl, data)
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

function getFeedbacks({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(feedbacksUrl, data)
      .then((response) => {
        const payload = {
          messages: response.data.data,
          total: response.data.total,
        };
        commit('setFeedbacks', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function getInfoPages({ commit }, data) {
  console.log('fgg');
  return new Promise((resolve, reject) => {
    axios.post(infoPagesUrl, data)
      .then((response) => {
        const payload = {
          allInfos: response.data.data,
          total: response.data.total,
        };
        commit('setInfoPages', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getFAQ,
  getNews,
  getOneNews,
  getOnePage,
  getServices,
  sendFeedback,
  getFeedbacks,
  getInfoPages,
};
