function setHousingList(state, payload) {
  state.housingList = payload;
}

function setRoomsList(state, payload) {
  state.roomsList = payload;
}

export {
  setHousingList,
  setRoomsList,
};
