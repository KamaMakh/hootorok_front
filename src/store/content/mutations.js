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

function setOneService(state, services) {
  state.oneService = services;
}

function resetOneService(state) {
  state.oneService = {};
}

function setOneNews(state, news) {
  state.oneNews = news;
}

function resetOneNews(state) {
  state.oneNews = null;
}

function setFAQ(state, faq) {
  state.faq = faq;
}

export {
  setPage,
  setServices,
  setOneService,
  resetOneService,
  setNews,
  setOneNews,
  resetOneNews,
  setFAQ,
};
