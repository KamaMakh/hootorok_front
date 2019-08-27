function setPage(state, page) {
  const tempState = Object.assign({}, state.pages);
  tempState[page.text_id] = page;
  state.pages = tempState;
}

export {
  setPage,
};
