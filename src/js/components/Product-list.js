import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom'

import Breadcrumb from './Breadcrumb';
import {StateContext} from '../context/StateContext';

const ProductList = () => {
  const history = useHistory();
  const {data} = useContext(StateContext);
  const items = data.items ? data.items : [];

  const onClickProduct = (event, productId) => {
    event.preventDefault();

    history.push(`/items/${productId}`);
  }

  return (
    <>
      <Breadcrumb />
      <div className="products grid">
        <ul className="products__container">
        {items.length ? (
            items.map((elem) => {
              const {id, thumbnail, price, title} = elem;
              
              return (
                <li key={id} className="products__element">
                  <button onClick={(event) => onClickProduct(event, id)}>
                    <figure className="products__image">
                      <img alt="" src={thumbnail}/>
                    </figure>
                    <figcaption className="products__body">
                      <p className="products__price">$ {price}</p>
                      <p className="products__text">{title}</p>
                    </figcaption>
                  </button>
                </li>
              );
            })
          ) : (
            <li>No hay artículos disponibles</li>
          )
        }
        </ul> 
      </div>
    </>
  );
};

export default ProductList;