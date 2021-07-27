/**
 * Constants.
 * @enum {string|number}
 */
 const CONSTANTS = {
  API: {
    AUTHOR: {
      author: {
        name: 'Diego Felipe',
        lastname: 'Moreno'
      }
    },
    CURRENCY_ID: 'COP',
    DOMAIN_END_POINT: 'https://api.mercadolibre.com',
    CURRENCIES_END_POINT: '/currencies/',
    ITEM_END_POINT: '/items/​',
    DESCRIPTION_END_POINT: '/description',
    CATEGORY_END_POINT: '/categories/',
    SEARCH_END_POINT: '/sites/MCO/search?q=​',
  },
  STATUS_CODE: {
    SUCCESS: 200,
    FAIL: 404,
    ERROR: 500
  },
  REQUEST_MESSAGE: {
    SERVER_ERROR: 'Server Error',
    FAIL_ERROR: 'error 404',
    API_ERROR: 'API Error'
  }
};

module.exports = CONSTANTS;