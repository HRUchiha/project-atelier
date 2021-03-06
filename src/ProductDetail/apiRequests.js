const axios = require('axios');

const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc';

// Update params object to meet your needs

const fetchCurrentProduct = (productId) => {
  const options = {
    url: `/products/${productId}`,
    baseURL: apiURL,
    method: 'get',
    headers: { authorization: process.env.API_KEY },
  };
  return axios(options);
};

const fetchStyles = (productId) => {
  const options = {
    url: `/products/${productId}/styles`,
    baseURL: apiURL,
    method: 'get',
    headers: { authorization: process.env.API_KEY },
  };
  return axios(options);
};

const fetchReview = (productId) => {
  const options = {
    url: '/reviews/meta',
    baseURL: apiURL,
    method: 'get',
    headers: { authorization: process.env.API_KEY },
    params: { product_id: productId },
  };
  return axios(options);
};

const postCart = (sku_id, count) => {
  const options = {
    url: '/cart',
    baseURL: apiURL,
    method: 'post',
    data: {sku_id: sku_id, count: count},
    headers: { authorization: process.env.API_KEY },
  };
  return axios(options);
};

const postInteractions = (element, widget, time) => {
  const options = {
    url: '/interactions',
    baseURL: apiURL,
    method: 'post',
    data: {element: element, widget: widget, time: time.toString()},
    headers: { authorization: process.env.API_KEY },
  };
  return axios(options);
}

module.exports = {
  fetchCurrentProduct,
  fetchStyles,
  fetchReview,
  postCart,
  postInteractions,
};
