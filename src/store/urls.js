const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const servicesUrl = `${serverUrl}/pages/getAllServices`;
const loginUrl = `${serverUrl}/auth/login`;
const newsUrl = `${serverUrl}/getNews`;
const logoutUrl = `${serverUrl}/auth/logout`;
const checkAuthUrl = `${serverUrl}/auth/check`;

export {
  serverUrl,
  registerUrl,
  servicesUrl,
  loginUrl,
  newsUrl,
  logoutUrl,
  checkAuthUrl,
};
