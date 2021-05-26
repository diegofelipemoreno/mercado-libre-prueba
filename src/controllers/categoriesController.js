import {requestService} from '../services/requestService';

/**
 * Manages the categories data.
 */
class CategoriesController {
  /**
   * Gets a dictionary key category ID values number of times.
   * @param {!Array<Object>} items List of data categories.
   * @return {!Object} callback Request response callback.
   * @private
   */
  getCategoryIdDict_ = (items) => {
    let categoryIdDict = {};

    if (!items) {
      return categoryIdDict;
    }

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const {category_id} = element;

      if (categoryIdDict[category_id]) {
        categoryIdDict[category_id] += 1;
      } else {
        categoryIdDict[category_id] = 1;
      }
    }

    return categoryIdDict;
  }

  /**
   * Gets the category ID with more visibility.
   * @param {!Array<Object>} items List of data categories.
   * @return {string} callback Request response callback.
   * @private
   */
  getMaxCategoryId_ = (items) => {
    const categoryIdDict = this.getCategoryIdDict_(items);
    const categoryIdList = Object.values(categoryIdDict);
    const max = Math.max(...categoryIdList);
    let mainCategoryId = '';

    if (!categoryIdList.length) {
      return '';
    }

    for (const key in categoryIdDict) {
      if (categoryIdDict[key] === max) {
        mainCategoryId = key;
      }
    }

    return mainCategoryId;
  }

  /**
   * Gets the category data from request.
   * @param {string} items The category ID.
   * @return {Array<Object> | string}
   * @private
   */
  getCategoryData_ = (async(categoryId) => {
    if(!categoryId) {
      return '';
    }

    const categoryData = await requestService.getCategoryDataById(categoryId);

    return categoryData?.categories?.path_from_root || [];
  });
  
  /**
   * Gets the category data from ID argument.
   * @param {string} items The category ID.
   * @return {Array<Object>}
   */
  getCategoryById = async(categoryId) => {
    return await this.getCategoryData_(categoryId);
  };

  /**
   * Gets the category data from list of categories.
   * @param {Array<Object>} items The category ID.
   * @return {Array<Object>}
   */
  getCategoryByItems = async(items) => {
    const maxCategoryId = this.getMaxCategoryId_(items);
    
    return await this.getCategoryData_(maxCategoryId);
  };

  /**
   * Initializes.
   * @return {Object<Function>}
   */
  init() {
    return {
      getCategoryById: this.getCategoryById,
      getCategoryByItems: this.getCategoryByItems,
    }
  }
}

export const categoriesController = new CategoriesController().init();