const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const servicesUrl = `${serverUrl}/services/getAllServices`;
const loginUrl = `${serverUrl}/auth/login`;

export {
  serverUrl,
  registerUrl,
  servicesUrl,
  loginUrl,
};
