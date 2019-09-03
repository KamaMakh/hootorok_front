function setHousings(state, data) {
  state.housingsTotal = parseInt(data.total, 10);
  state.housings = data.housings;
}

function setHousing(state, housing) {
  state.housing = housing;
}

function setRooms(state, rooms) {
  state.rooms = rooms;
}

function setRoom(state, room) {
  state.room = room;
}

export {
  setHousings,
  setRooms,
  setRoom,
  setHousing,
};
