import { axios } from 'boot/axios';
import onError from 'src/store/onError';
import {
  deleteMessageUrl,
} from 'src/store/urls';


function deleteMessage(context, data) {
  return new Promise((resolve, reject) => {
    axios.post(deleteMessageUrl, data)
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

export {
  deleteMessage,
};
