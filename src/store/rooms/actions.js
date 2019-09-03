import axios from 'axios';
import onError from 'src/store/onError';
import {
  allHousingsUrl,
  oneHousingUrl,
  allRoomsUrl,
  oneRoomUrl,
} from 'src/store/urls';

function getHousings({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(allHousingsUrl)
      .then((response) => {
        commit('setHousings', response.data.data);

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
      .catch(error => onError(error, reject));
  });
}

function getRooms({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(allRoomsUrl)
      .then((response) => {
        commit('setRooms', response.data.data);

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
  getRooms,
  getRoom,
  getHousing,
};
