const CONSTANTS = require('../constants');

const {getItemEntity, getResultsMax, getItemCategories} = require('./helpers'); 
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
      body: await getSearchResultsFromService(requestUtil, body)
    };
  } 
};

/**
 * Gets search result data filtered from the service.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} body The search results request response.
 * @return {!Object}
 */
 const getSearchResultsFromService = async(requestUtil, {data}) => {
  const {results} = data;
  const itemsMaxResults = getResultsMax(results, 4);
  const items = [];
  let categoryId = '';

  for (let index = 0; index < itemsMaxResults.length; index++) {
    const item = itemsMaxResults[index];
    const itemEntity = await getItemEntity(requestUtil, item);

    categoryId = item.category_id;
    items.push(itemEntity);
  }

  return searchService({
    items,
    categories: await getItemCategories(requestUtil, categoryId)
  });
}

module.exports = searchController;
