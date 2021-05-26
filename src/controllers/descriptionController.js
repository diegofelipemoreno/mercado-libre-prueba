import {requestService} from '../services/requestService';

/**
 * Manages the description product data.
 */
class DescriptionController {
  /**
   * Gets a product data merged with the product's description.
   * @param {!Object} product The product data.
   * @return {Object}
   * @private
   */
  getProductWithDescription_ = async(product) => {
    const {id} = product;
    const productText = await requestService.getItemTextById(id);
    const plainText = productText?.item?.plain_text || '';
    
    return {...product, plainText};
  }

  /**
   * Initializes.
   * @return {Object<Function>}
   */
  init() {
    return {
      getProductWithDescription: this.getProductWithDescription_,
    }
  }
}

export const descriptionController = new DescriptionController().init();