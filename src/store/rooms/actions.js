import axios from 'axios';
import onError from 'src/store/onError';
import {
  allHousingsUrl,
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
  getRooms,
  getRoom,
};
