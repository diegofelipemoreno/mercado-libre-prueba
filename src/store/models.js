import {requestService} from '../services/requestService';
import {categoriesController} from '../controllers/categoriesController';
import {descriptionController} from '../controllers/descriptionController';

export const AppState = {
  state: {
    items: [],
    categories: [],
    product: {},
  },
  reducers: {
    setItems(state, payload) {
      return {
        ...state,
        items: payload,
      };
    },
    setCategories(state, payload) {
      return {
        ...state,
        categories: payload,
      };
    },
    setProduct(state, payload) {
      return {
        ...state,
        product: payload,
      };
    }
  },
  effects: (dispatch) => ({
    async fetchItems({searchValue, pathname}) {
      try {
        const itemsRegExp = /\/items\//g;
        const itemId = pathname.split(itemsRegExp)[1];
        let items = [];
        let categories = [];
        let product = {};
        let productWithDescrip = {};

        if (searchValue) {
          items = await requestService.getItemsBySearch(searchValue);
          categories = await categoriesController.getCategoryByItems(items);

          dispatch.AppState.setItems(items);
          dispatch.AppState.setCategories(categories);

          return;
        }

        if (itemId) {
          product = await requestService.getItemById(itemId);
          productWithDescrip = await descriptionController.getProductWithDescription(product.item);
          categories = await categoriesController.getCategoryById(product.item.category_id);

          dispatch.AppState.setCategories(categories);
          dispatch.AppState.setProduct(productWithDescrip);

          return;
        }
      } catch (error) {
        console.error(error, 'On Effects fetchItems');
      }
    }
  }),
};