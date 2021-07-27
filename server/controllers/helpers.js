const CONSTANTS = require('../constants.js'); 
const Item = require('../entities/item');

/**
 * Gets the item entity instance.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} itemData The item data from the request response.
 * @return {!Object}
 */
 const getItemEntity = async(requestUtil, itemData) => {
  const itemDescription = await getItemDescription(requestUtil, itemData.id);
  const itemCurrency = await getItemCurrencyData(requestUtil);
  const itemEntity = new Item();

  itemEntity.data = itemData;
  itemEntity.description = itemDescription;
  itemEntity.currency = itemCurrency;

  return itemEntity;
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
  const descriptionData = body.data || '';

  return descriptionData;
}

/**
 * Get the item category/ies.
 * @param {!Function} requestUtil Request util object.
 * @param {Object} categoryId Item category ID.
 * @return {!Array<string>}
 */
 const getItemCategories = async (requestUtil, categoryId) => {
  const categEndpoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.CATEGORY_END_POINT}${categoryId}`;
  const {body} = await requestUtil(categEndpoint);
  const categoryData = body.data || null;

  return categoryData;
}

/**
 * Gets the items result maximum limit.
 * @param {string} id The product ID.
 * @param {number} maxLimit The maximum limit of items to show.
 * @return {Array}
 */
 const getResultsMax = (items, maxLimit) => {
  return items.filter((elem, index) => {
    if (index < maxLimit) {
      return elem;
    }
  });
}


module.exports = {getItemEntity, getResultsMax, getItemCategories};