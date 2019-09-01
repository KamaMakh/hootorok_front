import axios from 'axios';
import { getAllHousingsUrl, getAllRoomsUrl } from 'src/store/urls';

function fetchHousingList({ commit }) {
  return new Promise((resolve) => {
    axios.post(getAllHousingsUrl)
      .then((response) => {
        commit('setHousingList', response.data.data);
        resolve();
      })
      .catch(error => console.log('error', error));
  });
}

function fetchRoomsList({ commit }) {
  return new Promise((resolve) => {
    axios.post(getAllRoomsUrl)
      .then((response) => {
        commit('setRoomsList', response.data.data);
        resolve();
      })
      .catch(error => console.log('error', error));
  });
}

export {
  fetchHousingList,
  fetchRoomsList,
};
