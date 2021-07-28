const CONSTANTS = require('../constants');

const getItemDict = require('./helpers'); 
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
  const item = await getItemDict(requestUtil, itemData);

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
      body: itemService(item)
    };
  } 
};

module.exports = itemController;
