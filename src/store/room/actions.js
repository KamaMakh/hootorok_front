import { axios } from 'boot/axios';
import onError from 'src/store/onError';
import {
  getOneRoom,
} from 'src/store/urls';

function fetchOneRoom({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.post(getOneRoom, { id: index })
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
