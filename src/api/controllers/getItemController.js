const CONSTANTS = require('../constants.js'); 
const apiRequestService	= require('../apiRequestService.js'); 

/**
 * Sets the item dictionary with the specific data.
 * @param {!Object} product The item full data.
 * @return {Object} callback Request response callback.
 */
const setItemData = (product) => {
  const {item, description, currency} = product;
  const {symbol, decimal_places} = currency;
  const {id, title, thumbnail, condition, shipping, sold_quantity, price, category_id} = item;
  const {free_shipping} = shipping;
  const plain_text = description ? description.plain_text : null;

  return {
    id,
    title,
    price: {
      currency: symbol,
      amount: price,
      decimals: decimal_places
    },
    picture: thumbnail,
    condition,
    free_shipping,
    sold_quantity,
    description: plain_text,
    category_id,
  };
}

/**
 * Fetchs the item data from the the item endpoint.
 * @param {!Object} req Request object.
 * @param {!Object} res Response object.
 * @param {!Function} callback Request response callback.
 * @private
 */
const fetchItem_ = (req, res, callback) => {
  const itemEndPoint =
  `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${req.params.id}`;
  const descriptionPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${req.params.id}${CONSTANTS.API.DESCRIPTION_END_POINT}`;
  const currencyEndPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.CURRENCIES_END_POINT}${CONSTANTS.API.CURRENCY_ID}`;
  const endPointDict = {
    item: itemEndPoint,
    description: descriptionPoint,
    currency: currencyEndPoint
  }

  apiRequestService.makeRequest(res, endPointDict, (body) => {
    const item = setItemData(body);

    callback(item);
  });
}

const getItem = (req, res) => {
  fetchItem_(req, res, (item) => {
    res.send({
      ...CONSTANTS.API.AUTHOR,
      item
    });
  });
}

module.exports = {getItem, setItemData};