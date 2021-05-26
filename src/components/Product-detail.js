import React from 'react';

const ProductDetail = ({product}) => {
  const isValidProduct = !!Object.values(product).length;
  const {picture, sold_quantity, title, price, description, condition} = product;

  return (
    <>
      {isValidProduct && (
        <div className="product grid">
          <figure className="product__image">
            <img alt="" src={picture}/>
          </figure>
          <figcaption className="product__body">
            <small className="product__eyebrow">{condition} {sold_quantity} vendidos</small>
            <h2 className="product__heading">{title}</h2>
            <p className="product__price">{price?.currency} {price?.amount}</p>
            <button className="cta-1">Comprar</button>
          </figcaption>
          {description && (
            <div className="product__description">
              <p className="product__title">Descripción del producto</p>
              <p className="product__text">{description}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetail;