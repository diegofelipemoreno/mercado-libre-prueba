import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Breadcrumb from './Breadcrumb';
import {StateContext} from '../context/StateContext';
import {requestService} from '../../services/requestService';

const ProductDetail = () => {
  const {setData, data} = useContext(StateContext);
  const {id} = useParams();
  const {items} = data;

  const [productData, setProductData] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const getProductData = async(product) => {
      if (!product) {
        return;
      }
  
      const {title, thumbnail, price, sold_quantity, category_id, description} = product;

      setCategoryId(category_id);
      setProductData({title, thumbnail, price, sold_quantity, description});
    };
  
    const getProductFromRequest = async() => {
      const currentData = await requestService.getItemById(id);
      const {item} = currentData;

      getProductData(item);
    };

    const getProductFromState = () => {
      if (!items) {
        return null;
      }

      let product = null;
      
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        
        if (element.id === id) {
          product = element;
        }
      }

      return product;
    }
    
    const init = () => {
      const currentProduct = getProductFromState();

      if (currentProduct) {
        getProductData(currentProduct);

        return;
      }

      getProductFromRequest();
    };

    init();
  }, [items, id, setData]);

  return (
    <>
      <Breadcrumb categoryId={categoryId}/>
      {productData && (
        <div className="product grid">
          <figure className="product__image">
            <img alt="" src={productData.thumbnail}/>
          </figure>
          <figcaption className="product__body">
            <p className="product__eyebrow">Nuevo {productData.sold_quantity} vendidos</p>
            <h2 className="product__heading">{productData.title}</h2>
            <p className="product__price">$ {productData.price}</p>
            <button className="cta-1">Comprar</button>
          </figcaption>
          <div className="product__description">
            <p className="product__title">Descripción del producto</p>
            <p className="product__text">{productData.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
