const CONSTANTS = require('../constants');

const getItemDict = require('./helpers'); 
const searchService = require('../services/searchService'); 

/**
 * Gets the respond to the client.
 * @param {!Function} requestUtil Request util object.
 * @param {string} params The req parameter to get the data.
 */
const searchController = async(requestUtil, params) => {
  const searchEndPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.SEARCH_END_POINT}${params}`;
  const resultsResponse = await requestUtil(searchEndPoint);
  const {statusCode, body} = resultsResponse;
  const searchResults = body.data;

  if (statusCode >= 500) {
    return {
      statusCode,
      body: {message: CONSTANTS.REQUEST_MESSAGE.SERVER_ERROR}
    };
  }

  if (statusCode >= 400) {
    return {
      statusCode,
      body: {message: CONSTANTS.REQUEST_MESSAGE.FAIL_ERROR}
    };
  }

  if (statusCode === 200) {
    return {
      statusCode,
      body: await getSearchResultsFromService(requestUtil, searchResults)
    };
  } 
};

/**
 * Gets search result data filtered from the service.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} searchResults The search results request response.
 * @return {!Object}
 */
 const getSearchResultsFromService = async(requestUtil, searchResults) => {
  const {results, filters} = searchResults;
  const MAXIMUM_ITEMS = 4;
  const items = [];

  for (let index = 0; index < results.length; index++) {
    if (index < MAXIMUM_ITEMS) {
      const item = await getItemDict(requestUtil, results[index]);

      items.push(item);
    }
  }

  return searchService({
    items,
    categories: filters
  });
}

module.exports = searchController;
