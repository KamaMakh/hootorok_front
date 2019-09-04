function setHousings(state, housings) {
  state.housings = housings;
}

function setRooms(state, data) {
  state.roomsTotal = parseInt(data.total, 10);
  state.rooms = data.rooms;
}

function setRoom(state, room) {
  state.room = room;
}

export {
  setHousings,
  setRooms,
  setRoom,
};
