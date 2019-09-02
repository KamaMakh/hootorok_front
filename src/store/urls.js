const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const getOnePageUrl = `${serverUrl}/pages/getOnePage`;
const registerUrl = `${serverUrl}/auth/register`;
const resetPasswordUrl = `${serverUrl}/auth/sendRecoveryHash`;
const servicesUrl = `${serverUrl}/pages/getAllServices`;
const loginUrl = `${serverUrl}/auth/login`;
const newPasswordUrl = `${serverUrl}/auth/setNewPassword`;
const recoveryHashUrl = `${serverUrl}/auth/checkRecoveryHash`;
const newsUrl = `${serverUrl}/news/getAllNews`;
const oneNewsUrl = `${serverUrl}/news/getOneNews`;
const logoutUrl = `${serverUrl}/auth/logout`;
const checkAuthUrl = `${serverUrl}/auth/check`;
const getOneRoomUrl = `${serverUrl}/rooms/getOneRoom`;
const getAllHousingsUrl = `${serverUrl}/housings/getAllHousings`;
const getAllRoomsUrl = `${serverUrl}/rooms/getAllRooms`;

export {
  serverUrl,
  registerUrl,
  resetPasswordUrl,
  servicesUrl,
  loginUrl,
  newPasswordUrl,
  recoveryHashUrl,
  newsUrl,
  oneNewsUrl,
  logoutUrl,
  checkAuthUrl,
  getAllHousingsUrl,
  getAllRoomsUrl,
  getOnePageUrl,
  getOneRoomUrl,
};
