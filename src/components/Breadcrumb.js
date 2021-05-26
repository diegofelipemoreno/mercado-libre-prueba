import React from 'react';

const Breadcrumb = (props) => {
  const {categories} = props;

  return (
    <div className="breadcrumb grid">
      <div className="breadcrumb__container">
        {!!categories?.length && (
          <ul className="breadcrumb__list">
            {categories.map((elem, index) => {
              const categoryIdx = `category-${index}`;

              return (
                <li key={categoryIdx} className="breadcrumb__category">
                  {elem}
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
