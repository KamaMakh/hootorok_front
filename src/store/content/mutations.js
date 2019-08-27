function setPage(state, page) {
  state.pages[page.text_id] = page;
}

export {
  setPage,
};
