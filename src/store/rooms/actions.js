import axios from 'axios';
import { getAllHousingsUrl, getAllRoomsUrl } from 'src/store/urls';

function getHousings({ commit }) {
  return new Promise((resolve) => {
    axios.post(getAllHousingsUrl)
      .then((response) => {
        commit('setHousings', response.data.data);

        resolve();
      })
      .catch(error => console.log('error', error));
  });
}

function getRooms({ commit }) {
  return new Promise((resolve) => {
    axios.post(getAllRoomsUrl)
      .then((response) => {
        commit('setRooms', response.data.data);

        resolve();
      })
      .catch(error => console.log('error', error));
  });
}

export {
  getHousings,
  getRooms,
};
