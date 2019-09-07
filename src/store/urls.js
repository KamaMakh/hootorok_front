const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const onePageUrl = `${serverUrl}/pages/getOnePage`;
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
const oneRoomUrl = `${serverUrl}/rooms/getOneRoom`;
const allHousingsUrl = `${serverUrl}/housings/getAllHousings`;
const allRoomsUrl = `${serverUrl}/rooms/getAllRooms`;
const feedbackUrl = `${serverUrl}/feedback/sendMessage`;
const faqUrl = `${serverUrl}/pages/getAllFAQ`;
const allMessagesUrl = `${serverUrl}/feedback/getAllMessages`;
const deleteMessageUrl = `${serverUrl}/feedback/deleteMessage`;

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
  allHousingsUrl,
  allRoomsUrl,
  onePageUrl,
  oneRoomUrl,
  feedbackUrl,
  faqUrl,
  allMessagesUrl,
  deleteMessageUrl,
};
