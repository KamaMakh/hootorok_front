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
const editProfileUrl = `${serverUrl}/user/editProfile`;
const oneRoomUrl = `${serverUrl}/rooms/getOneRoom`;
const allHousingsUrl = `${serverUrl}/housings/getAllHousings`;
const oneHousingUrl = `${serverUrl}/housings/getHousing`;
const addHousingUrl = `${serverUrl}/housings/addHousing`;
const editHousingUrl = `${serverUrl}/housings/editHousing`;
const addPageUrl = `${serverUrl}/pages/addPage`;
const editPageUrl = `${serverUrl}/pages/editPage`;
const allRoomsUrl = `${serverUrl}/rooms/getAllRooms`;
const sendFeedbackUrl = `${serverUrl}/feedback/sendMessage`;
const faqUrl = `${serverUrl}/pages/getAllFAQ`;
const categoriesUrl = `${serverUrl}/pages/getAllCategories`;
const feedbacksUrl = `${serverUrl}/feedback/getAllMessages`;
const deleteFeedbackUrl = `${serverUrl}/feedback/deleteMessage`;
const usersUrl = `${serverUrl}/user/getAllUsers`;
const infoPagesUrl = `${serverUrl}/pages/getAllInfos`;

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
  oneHousingUrl,
  addHousingUrl,
  editHousingUrl,
  allRoomsUrl,
  onePageUrl,
  oneRoomUrl,
  sendFeedbackUrl,
  faqUrl,
  feedbacksUrl,
  deleteFeedbackUrl,
  editProfileUrl,
  addPageUrl,
  editPageUrl,
  categoriesUrl,
  usersUrl,
  infoPagesUrl,
};
