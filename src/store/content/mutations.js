function setPage(state, page) {
  const tempState = Object.assign({}, state.pages);
  tempState[page.text_id] = page;
  state.pages = tempState;
}

function setNews(state, data) {
  state.newsTotal = parseInt(data.total, 10);
  state.news = data.news;
}

function setServices(state, services) {
  state.services = services;
}

export {
  setPage,
  setServices,
  setNews,
};
