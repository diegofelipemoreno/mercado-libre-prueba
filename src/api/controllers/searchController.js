const CONSTANTS = require('../constants.js'); 
const apiRequestService	= require('../apiRequestService.js'); 
const {categoriesController} = require('./getCategoryController.js'); 
const {setItemData}  = require('./getItemController.js'); 

/**
 * Gets the item data.
 * @param {!Object} req Request object.
 * @param {!Object} res Response object.
 * @return {Promise}
 * @private
 */
const getItems = (items, res) => {
  return Promise.all(Object.values(items).map((elem) => {
    const {id} = elem;
    const itemEndPoint =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${id}`;
    const descriptionPoint =
      `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${id}${CONSTANTS.API.DESCRIPTION_END_POINT}`;
    const currencyEndPoint =
      `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.CURRENCIES_END_POINT}${CONSTANTS.API.CURRENCY_ID}`;
    const endPointDict = {
      item: itemEndPoint,
      description: descriptionPoint,
      currency: currencyEndPoint
    }

    return new Promise((resolve) => {
      apiRequestService.makeRequest(res, endPointDict, (body) => {
        const itemData = setItemData(body);

        resolve(itemData);
      });
    });
  }));
}

/**
 * Gets the items maximum limit.
 * @param {string} id The product ID.
 * @param {number} maxLimit The maximum limit of items to show.
 * @return {Array}
 */
 const getItemsMax_ = (items, maxLimit) => {
  return items.filter((elem, index) => {
    if (index < maxLimit) {
      return elem;
    }
  });
}

/**
 * Gets the search data result.
 * @param {!Object} req Request object.
 * @param {!Object} res Response object.
 * @return {Promise}
 * @private
 */
const getSearchResults_ = (req, res) => {
  const endPointUrl =
  `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.SEARCH_END_POINT}${req.query.q}`;
  const searchDict = {
    'search': endPointUrl,
  }

  return new Promise((resolve) => {
    apiRequestService.makeRequest(res, searchDict, (body) => {
      const {search} = body;
      const {results} = search;
      const maxResults = getItemsMax_(results, 4);
  
      resolve(maxResults);
    });
  });
}

exports.search = async(req, res) => {
  const categoriesGetter = categoriesController.init(res);
  const results = await getSearchResults_(req, res);
  const items = await getItems(results, res);
  const categories = await categoriesGetter.getCategoryByItems(items);

  res.send({
    ...CONSTANTS.API.AUTHOR,
    items,
    categories
  });
};