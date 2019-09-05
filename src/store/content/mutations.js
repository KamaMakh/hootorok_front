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

function setOneNews(state, news) {
  state.oneNews = news;
}

function resetOneNews(state) {
  state.oneNews = null;
}

function setFAQ(state, faq) {
  state.faq = faq;
}

function setAllServices(state, data) {
  state.servicesTotal = parseInt(data.total, 10);
  state.services = data.services;
}

function setService(state, service) {
  state.service = service;
}

export {
  setPage,
  setNews,
  setOneNews,
  resetOneNews,
  setFAQ,
  setServices,
  setAllServices,
  setService,
};
