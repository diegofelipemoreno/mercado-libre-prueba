const CONSTANTS = require('../constants.js'); 

/**
 * Items service that manages the item data business logic.
 * @param {Object} item Item business logic data.
 */
const itemService = (item) => {
  const {data, description, currency} = item;
  const {symbol, decimal_places} = currency;
  const {id, title, thumbnail, condition, shipping, sold_quantity, price, category_id} = data;
  const {free_shipping} = shipping;

  return {
    ...CONSTANTS.API.AUTHOR,
    item: {
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
      description: description,
      category_id,
    }
  };
};

module.exports = itemService;