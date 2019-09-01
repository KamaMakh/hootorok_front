import axios from 'axios';

export default ({ Vue, ssrContext }) => {
  const headers = ssrContext && ssrContext.req.headers;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = headers;

  Vue.prototype.$axios = axios;
};

export { axios };
