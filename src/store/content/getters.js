function getContent(state) {
  return state.content.body;
}

function allServices(state) {
  return state.services;
}

export {
  getContent,
  allServices,
};
