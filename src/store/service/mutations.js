function setUser(state, user) {
  state.user = user;
}

function resetUser(state) {
  state.user = {};
}

function updateServices(state, services) {
  state.services = services;
}

export {
  setUser,
  resetUser,
  updateServices,
};
