import axios from 'axios';
import onError from 'src/store/onError';
import {
  allHousingsUrl,
  oneHousingUrl,
  allRoomsUrl,
  oneRoomUrl,
} from 'src/store/urls';

function getHousings({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(allHousingsUrl, data)
      .then((response) => {
        const payload = {
          housings: response.data.data,
          total: response.data.total,
        };
        commit('setHousings', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function getHousing({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.post(oneHousingUrl, { id: index })
      .then((response) => {
        commit('setHousing', response.data.data[0]);

        resolve();
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          commit('resetHousing');

          resolve();

          return;
        }

        onError(error, reject);
      });
  });
}

function getRooms({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(allRoomsUrl, data)
      .then((response) => {
        const payload = {
          rooms: response.data.data,
          total: response.data.total,
        };
        commit('setRooms', payload);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

function getRoom({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.post(oneRoomUrl, { id: index })
      .then((response) => {
        commit('setRoom', response.data.data);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  getHousings,
  getHousing,
  getRooms,
  getRoom,
};
