const axios = require('axios');

const CONSTANTS = require('./constants');
const removeNonAsciiChar = require('./utils');

/**
 * Fetch request from the API URL.
 * @param {string} url Endpoint URL request.
 * @return {!Object}
 */
 const requestUtil = async(url) => {
  try {
      const urlFiltered = removeNonAsciiChar(url);

      return axios
        .get(urlFiltered)
        .then((response) => {
          if (response.status === 200) {
            return {statusCode: response.status, body: response}; 
          } 

          if (response.status >= 400) {
            return {
              statusCode: response.status,
              body: {message: CONSTANTS.REQUEST_MESSAGE.API_ERROR}
            };
          }

          if (response.status >= 500) {
            return {
              statusCode: response.status,
              body: {message: CONSTANTS.REQUEST_MESSAGE.SERVER_ERROR}
            };
          }
        })
        .catch((error) => {
          const {response} = error;

          if (!response) {
            return {statusCode: CONSTANTS.STATUS_CODE.ERROR, body: {error}};
          }

          return {statusCode: response.status, body: {error}};
        });
    } catch (error) {
      const {response} = error;

      return {statusCode: response.status, body: {error}};
    }
  }

module.exports = requestUtil;