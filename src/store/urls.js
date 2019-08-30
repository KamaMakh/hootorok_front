const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const getHousingList = `${serverUrl}/housings/getAllHousings`;
const getAllRooms = `${serverUrl}/rooms/getAllRooms`;
const getMany = `${serverUrl}/rooms/getMany`;

export {
  serverUrl,
  getHousingList,
  getAllRooms,
  getMany,
};
