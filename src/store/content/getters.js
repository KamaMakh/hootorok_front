function getPage(state) {
  return function id(textId) {
    return state.pages[textId];
  };
}


export {
  getPage,
};
