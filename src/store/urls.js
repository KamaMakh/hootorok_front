const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
// заменить после создания метода
// const servicesUrl = `${serverUrl}/getServicesList`;
const servicesUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=10';

export {
  serverUrl,
  registerUrl,
  servicesUrl,
};
