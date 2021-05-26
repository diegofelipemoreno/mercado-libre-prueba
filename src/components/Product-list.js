import React from 'react';
import {useHistory} from 'react-router-dom'

const ProductList = ({items}) => {
  const history = useHistory();

  const onClickProduct = (event, productId) => {
    event.preventDefault();

    history.push(`/items/${productId}`);
  }

  return (
    <div className="products grid">
      <ul className="products__container">
      {items.length ? (
          items.map((elem) => {
            const {id, picture, price, title, free_shipping} = elem;
            const {currency, amount} = price;

            return (
              <li key={id} className="products__element">
                <button className="products__cta" onClick={(event) => onClickProduct(event, id)}>
                  <figure className="products__image">
                    <img alt="" src={picture}/>
                  </figure>
                  <figcaption className="products__body">
                    <p className="products__price">
                      {currency} {amount} {free_shipping && <img alt="" src="/images/ic_shipping.png"/>}
                    </p>
                    <p className="products__text">{title}</p>
                  </figcaption>
                </button>
              </li>
            );
          })
        ) : (
          <li className="products__element--no-results">No hay artículos disponibles</li>
        )
      }
      </ul> 
    </div>
  );
};

export default ProductList;