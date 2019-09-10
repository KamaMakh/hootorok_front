import { axios } from 'boot/axios';
import onError from 'src/store/onError';
import {
  deleteFeedbackUrl,
  addHousingUrl,
  editHousingUrl,
  addPageUrl,
  editPageUrl,
} from 'src/store/urls';

function addHousing(context, data) {
  return new Promise((resolve, reject) => {
    axios.post(addHousingUrl, data)
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

function editHousing(context, data) {
  return new Promise((resolve, reject) => {
    axios.post(editHousingUrl, data)
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

function addPage(context, data) {
  return new Promise((resolve, reject) => {
    axios.post(addPageUrl, data)
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

function editPage(context, data) {
  return new Promise((resolve, reject) => {
    axios.post(editPageUrl, data)
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

function deleteFeedback(context, id) {
  return new Promise((resolve, reject) => {
    axios.post(deleteFeedbackUrl, { id })
      .then(() => resolve())
      .catch(error => onError(error, reject));
  });
}

export {
  addHousing,
  editHousing,
  addPage,
  editPage,
  deleteFeedback,
};
