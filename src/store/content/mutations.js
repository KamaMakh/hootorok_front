function setPage(state, onePage) {
  const newPages = Object.assign({}, state.pages, { [onePage.id]: onePage.page });
  state.pages = newPages;
}

function setNews(state, data) {
  state.newsTotal = parseInt(data.total, 10);
  state.news = data.news;
}

function setServices(state, services) {
  state.services = services;
}

function setHousings(state, housings) {
  state.housings = housings;
}

function setOneNews(state, news) {
  state.oneNews = news;
}

function resetOneNews(state) {
  state.oneNews = {};
}

export {
  setPage,
  setServices,
  setHousings,
  setNews,
  setOneNews,
  resetOneNews,
};
