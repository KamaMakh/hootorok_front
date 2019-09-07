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

function resetOneNews(state) {
  state.oneNews = null;
}

function setFAQ(state, faq) {
  state.faq = faq;
}

function setAllMessages(state, data) {
  state.allMessagesTotal = parseInt(data.total, 10);
  state.allMessages = data.messages;
}

export {
  setPage,
  setNews,
  setOneNews,
  resetOneNews,
  setFAQ,
  setAllMessages,
  setServices,
};
