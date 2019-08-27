const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const getOnePageUrl = `${serverUrl}/pages/getOnePage`;

export {
  serverUrl,
  getOnePageUrl,
};
