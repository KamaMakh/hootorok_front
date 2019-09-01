import { axios } from 'boot/axios';
import onError from 'src/store/onError';
import {
  getOneRoomUrl,
} from 'src/store/urls';

function fetchOneRoom({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.post(getOneRoomUrl, { id: index })
      .then((response) => {
        commit('setRoom', response.data.room);
        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  fetchOneRoom,
};
