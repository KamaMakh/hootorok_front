function getPage(state) {
  return function getPageById(textId) {
    return state.pages[textId];
  };
}

export {
  getPage,
};
