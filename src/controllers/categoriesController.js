import {requestService} from '../services/requestService';

class CategoriesController {
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

  getCategoryData_ = (async(categoryId) => {
    if(!categoryId) {
      return '';
    }

    const categoryData = await requestService.getCategoryDataById(categoryId);

    return categoryData?.categories?.path_from_root || [];
  });
  
  getCategoryById = async(categoryId) => {
    return await this.getCategoryData_(categoryId);
  };

  getCategoryByItems = async(items) => {
    const maxCategoryId = this.getMaxCategoryId_(items);
    
    return await this.getCategoryData_(maxCategoryId);
  };

  init() {
    return {
      getCategoryById: this.getCategoryById,
      getCategoryByItems: this.getCategoryByItems,
    }
  }
}

export const categoriesController = new CategoriesController().init();