import React from 'react';

const Breadcrumb = (props) => {
  const {categories} = props;

  return (
    <div className="breadcrumb grid">
      <div className="breadcrumb__container">
        {!!categories?.length && (
          <ul className="breadcrumb__list">
            {categories.map((elem) => {
              const {id, name} = elem;

              return (
                <li key={id} className="breadcrumb__category">
                  {name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
