function setHousingList(state, payload) {
  state.housingList = payload;
}

function setRoomsList(state, payload) {
  state.rooms = payload;
}

export {
  setHousingList,
  setRoomsList,
};
