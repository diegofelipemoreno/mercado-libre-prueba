import React from 'react';

const ProductDetail = ({product}) => {
  const {thumbnail, sold_quantity, title, price, plainText} = product;

  return (
    <>
      {product && (
        <div className="product grid">
          <figure className="product__image">
            <img alt="" src={thumbnail}/>
          </figure>
          <figcaption className="product__body">
            <small className="product__eyebrow">Nuevo {sold_quantity} vendidos</small>
            <h2 className="product__heading">{title}</h2>
            <p className="product__price">$ {price}</p>
            <button className="cta-1">Comprar</button>
          </figcaption>
          {plainText && (
            <div className="product__description">
              <p className="product__title">Descripción del producto</p>
              <p className="product__text">{plainText}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetail;