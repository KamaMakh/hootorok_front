function getPage(state) {
  return function (textId) {
    return state.pages[textId];
  };
}


export {
  getPage,
};
