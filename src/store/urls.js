const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const servicesUrl = `${serverUrl}/pages/getAllServices`;
const loginUrl = `${serverUrl}/auth/login`;
const logoutUrl = `${serverUrl}/auth/logout`;
const checkAuthUrl = `${serverUrl}/auth/check`;
const getAllHousingsUrl = `${serverUrl}/housings/getAllHousings`;

export {
  serverUrl,
  registerUrl,
  servicesUrl,
  loginUrl,
  logoutUrl,
  checkAuthUrl,
  getAllHousingsUrl,
};
