import axios from 'axios';
import { registerUrl } from 'src/store/urls';

import onError from 'src/store/onError';

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(registerUrl, data)
      .then((response) => {
        commit('setUser', response.data.user);

        resolve();
      })
      .catch(error => onError(error, reject));
  });
}

export {
  register,
};
