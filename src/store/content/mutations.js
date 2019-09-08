function setPage(state, onePage) {
  const newPages = Object.assign({}, state.pages, { [onePage.id]: onePage.page });
  state.pages = newPages;
}

function setNews(state, data) {
  state.newsTotal = parseInt(data.total, 10);
  state.news = data.news;
}

function setServices(state, data) {
  state.servicesTotal = parseInt(data.total, 10);
  state.services = data.services;
}

function setOneNews(state, news) {
  state.oneNews = news;
}

function setOnePage(state, page) {
  state.page = page;
}

function resetOneNews(state) {
  state.oneNews = null;
}

function setFAQ(state, faq) {
  state.faq = faq;
}

function setCategories(state, data) {
  state.categoriesTotal = parseInt(data.total, 10);
  state.categories = data.categories;
}

export {
  setPage,
  setNews,
  setOneNews,
  resetOneNews,
  setFAQ,
  setServices,
  setCategories,
  setOnePage,
};
