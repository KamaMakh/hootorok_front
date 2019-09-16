function setHousings(state, data) {
  state.housingsTotal = parseInt(data.total, 10);
  state.housings = data.housings;
}

function setHousing(state, housing) {
  state.housing = housing;
}

function resetHousing(state) {
  state.housing = null;
}

function setRooms(state, data) {
  state.roomsTotal = parseInt(data.total, 10);
  state.rooms = data.rooms;
}

function setRoom(state, room) {
  state.room = room;
}

function setFreeRooms(state, freeRooms) {
  state.freeRooms = freeRooms;
}

function resetFreeRooms(state) {
  state.freeRooms = [];
}

export {
  setHousings,
  setHousing,
  resetHousing,
  setRooms,
  setRoom,
  setFreeRooms,
  resetFreeRooms,
};
