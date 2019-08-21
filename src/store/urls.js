const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
// const aboutInfoUrl = `${serverUrl}/getAboutInfo`;
const aboutInfoUrl = 'https://jsonplaceholder.typicode.com/users/1';
const loginUrl = `${serverUrl}/auth/login`;

export {
  serverUrl,
  registerUrl,
  aboutInfoUrl,
  loginUrl,
};
