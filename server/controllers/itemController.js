const CONSTANTS = require('../constants');

const {getItemEntity} = require('./helpers'); 
const itemService = require('../services/itemService'); 

/**
 * Gets the respond to the client.
 * @param {!Function} requestUtil Request util object.
 * @param {string} params The req parameter to get the data.
 */
const itemController = async(requestUtil, params) => {
  const itemEndPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${params}`;
  const itemResponse = await requestUtil(itemEndPoint);
  const {statusCode, body} = itemResponse;
  const itemData = body.data || null;

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
      body: await getItemDataFromService(requestUtil, itemData)
    };
  } 
};

/**
 * Get item data filtered from the service.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} itemData The item data from the request response.
 * @return {!Object}
 */
 const getItemDataFromService = async(requestUtil, itemData) => {
  const itemEntity = await getItemEntity(requestUtil, itemData);

  return itemService(itemEntity);
}

module.exports = itemController;
