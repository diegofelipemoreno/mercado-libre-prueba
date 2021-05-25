import {CONSTANTS_APP} from '../common/constants';
import {removeNonAsciiChar} from '../api/utils';

/**
 * Request Service to get data from the API.
 */
 class RequestService {
  /**
   * Requests to the API URL.
   * @param {string} url Endpoint URL request.
   * @return {!Object}
   */
  async fetchRequest(url) {
    const urlFiltered = removeNonAsciiChar(url);
    const headers = new Headers();
    const configRequest = {
      cache: 'default',
      headers: headers,
      method: 'GET',
      mode: 'cors'
    };
    const requestData = new Request(urlFiltered, configRequest);

    return fetch(requestData).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }).catch((error) => {
      console.error('There is a problem with the request', error);
    });
  }

  /**
   * Gets product's description from the API with the product ID.
   * @param {string} id The product ID.
   * @return {Promise}
   */
  async getItemTextById(id) {
    const urlRequest = `${CONSTANTS.API_DOMAIN}/api${CONSTANTS_APP.ITEMS_PATH}/${id}​/description`;

    return await this.fetchRequest(urlRequest);
  }

  /**
   * Gets a product from the API with the product ID.
   * @param {string} id The product ID.
   * @return {Promise}
   */
  async getItemById(id) {
    const urlRequest = `${CONSTANTS.API_DOMAIN}/api${CONSTANTS_APP.ITEMS_PATH}/${id}​`;

    return await this.fetchRequest(urlRequest);
  }

  /**
   * Gets the category data by the search/product ID.
   * @param {string} id The category ID.
   * @return {Promise}
   */
  async getCategoryDataById(id) {
    if (!id) {
      return;
    }

    const urlRequest = `${CONSTANTS.API_DOMAIN}${CONSTANTS_APP.CATEGORY_PATH}/${id}​`;

    return await this.fetchRequest(urlRequest);
  }
  
  /**
   * Gets the items maximum limit.
   * @param {string} id The product ID.
   * @return {Array}
   */
  getItemsMax = (items) => {
    return items.filter((elem, index) => {
      if (index < 4) {
        return elem;
      }
    });
  }

  /**
   * Gets the products list from the API with the query string.
   * @param {string} query The product string to search.
   * @return {Array}
   */
  async getItemsBySearch(query) {
    const urlRequest = `${CONSTANTS.API_DOMAIN}/api${CONSTANTS_APP.ITEMS_PATH}?q=${query}​`;
    const {items} = await this.fetchRequest(urlRequest);
    const itemsMax = this.getItemsMax(items);

    return itemsMax;
  }
}

/**
 * Constants.
 * @enum {Object}
 */
 const CONSTANTS = {
  API_DOMAIN: 'http://localhost:3001',
}

export const requestService = new RequestService();