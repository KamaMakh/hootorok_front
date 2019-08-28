export default function onError(error, reject) {
  console.error(error);

  const errorMessage = (error.response && error.response.data.message) || error.message;

  reject(errorMessage);
}
