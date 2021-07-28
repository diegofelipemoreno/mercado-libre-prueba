const CONSTANTS = require('../constants.js'); 

/**
 * Gets the item dictionary.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} itemData The item data from the request response.
 * @return {!Object}
 */
 const getItemDict = async(requestUtil, itemData) => {
  const itemDescription = await getItemDescription(requestUtil, itemData.id);
  const itemCurrency = await getItemCurrencyData(requestUtil);

  return {
    data: itemData,
    description: itemDescription,
    currency: itemCurrency,
  };
}

/**
 * Get the item currency data.
 * @param {!Function} requestUtil Request util object.
 * @return {!Object}
 */
 const getItemCurrencyData = async (requestUtil) => {
  const currencyEndPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.CURRENCIES_END_POINT}${CONSTANTS.API.CURRENCY_ID}`;
  const {body} = await requestUtil(currencyEndPoint);
  const currencyData = body.data || null;

  return currencyData;
}

/**
 * Get the item description.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} itemId Item ID.
 * @return {string}
 */
 const getItemDescription = async (requestUtil, itemId) => {
  const descriptionPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${itemId}${CONSTANTS.API.DESCRIPTION_END_POINT}`;
  const {body} = await requestUtil(descriptionPoint);

  return body.data || '';
}

module.exports = getItemDict;