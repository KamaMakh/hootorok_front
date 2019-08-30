import axios from 'axios';
import { getHousingList, getAllRooms } from 'src/store/urls';

function fetchHousingList({ commit }) {
  return new Promise((resolve) => {
    axios.post(getHousingList)
      .then((response) => {
        commit('setHousingList', response.data.data);
        resolve();
      })
      .catch(error => console.log('error', error));
  });
}

function fetchRoomsList({ commit }) {
  return new Promise((resolve) => {
    axios.post(getAllRooms)
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
