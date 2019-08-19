const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const loginUrl = `${serverUrl}/auth/login`;
const newsUrl = `${serverUrl}/getNews`;

export {
  serverUrl,
  registerUrl,
  loginUrl,
  newsUrl,
};
