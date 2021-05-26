import {requestService} from '../services/requestService';

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
        const itemsPathRegExp = /\/items\//g;
        const itemId = pathname.split(itemsPathRegExp)[1];

        if (searchValue) {
          const {items, categories} = await requestService.getItemsBySearch(searchValue);

          dispatch.AppState.setItems(items);
          dispatch.AppState.setCategories(categories);

          return;
        }

        if (itemId) {
          const {item} = await requestService.getItemById(itemId);
          const {categories} = await requestService.getCategoryDataById(item.category_id);

          dispatch.AppState.setProduct(item);
          dispatch.AppState.setCategories(categories);
  
          return;
        }
      } catch (error) {
        console.error(error, 'On Effects fetchItems');
      }
    }
  }),
};