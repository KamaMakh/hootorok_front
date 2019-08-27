function setNews(state, data) {
  state.newsTotal = parseInt(data.total, 10);
  state.news = data.news;
}

function setServices(state, services) {
  state.services = services;
}

export {
  setServices,
  setNews,
};
