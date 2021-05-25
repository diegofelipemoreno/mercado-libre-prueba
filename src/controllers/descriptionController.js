import {requestService} from '../services/requestService';

class DescriptionController {
  getProductWithDescription_ = async(product) => {
    const {id} = product;
    const productText = await requestService.getItemTextById(id);
    const plainText = productText?.item?.plain_text || '';
    
    return {...product, plainText};
  }

  init() {
    return {
      getProductWithDescription: this.getProductWithDescription_,
    }
  }
}

export const descriptionController = new DescriptionController().init();