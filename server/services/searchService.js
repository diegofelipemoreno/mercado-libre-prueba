const CONSTANTS = require('../constants'); 

/**
 * Service that manages the search results business logic.
 * @param {!Object} resultsData Search results data.
 */
const searchService = (resultsData) => {
  const {items, categories} = resultsData;
  const itemResults = [];
  const categoriesResult =
    categories ? categories.path_from_root.map((elem) => elem.name) : [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const {data, description, currency} = item;
    const {symbol, decimal_places} = currency;
    const {id, title, thumbnail, condition, shipping, sold_quantity, price, category_id} = data;
    const {free_shipping} = shipping;

    itemResults.push({
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
    });
  }

  return {
    ...CONSTANTS.API.AUTHOR,
    categories: categoriesResult,
    items: itemResults,
  }
};

module.exports = searchService;