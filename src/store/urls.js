const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const getHousingList = `${serverUrl}/rooms/getHousingList`;
const getMany = `${serverUrl}/rooms/getMany`;

export default {
  serverUrl,
  getHousingList,
  getMany,
};
