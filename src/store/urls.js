const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const onePageUrl = `${serverUrl}/pages/getOnePage`;
const loginUrl = `${serverUrl}/auth/login`;

export {
  serverUrl,
  registerUrl,
  onePageUrl,
  loginUrl,
};
