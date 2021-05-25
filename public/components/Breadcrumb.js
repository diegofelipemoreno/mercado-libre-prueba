import React, {useEffect, useState, useContext} from 'react';

import {requestService} from '../../services/requestService';
import {StateContext} from '../context/StateContext';

const Breadcrumb = ({categoryId}) => {
  const {data} = useContext(StateContext);
  const items = data.items ? data.items : [];

  const [breadcrumbList, setBreadcrumbList] = useState([]);

  useEffect(() => {
    const getCategoryIdDict = () => {
      let categoryIdDict = {};

      if (!items) {
        return categoryIdDict;
      }

      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const {category_id} = element;

        if (categoryIdDict[category_id]) {
          categoryIdDict[category_id] += 1;
        } else {
          categoryIdDict[category_id] = 1;
        }
      }

      return categoryIdDict;
    }

    const getMaxCategoryId = () => {
      const categoryIdDict = getCategoryIdDict();
      const categoryIdList = Object.values(categoryIdDict);
      const max = Math.max(...categoryIdList);
      let mainCategoryId = '';

      if (!categoryIdList.length) {
        return '';
      }

      for (const key in categoryIdDict) {
        if (categoryIdDict[key] === max) {
          mainCategoryId = key;
        }
      }

      return mainCategoryId;
    }

    const getCategoryData = (async(categoryId) => {
      if(!categoryId) {
        return '';
      }

      const categoryData = await requestService.getCategoryDataById(categoryId);
      
      return categoryData?.categories?.path_from_root || [];
    });
    
    const init = async() => {
      const maxCategoryId = categoryId || getMaxCategoryId();
      const breadcrumbData = await getCategoryData(maxCategoryId);

      setBreadcrumbList(breadcrumbData);
    };

    init();
  }, [categoryId, items]);

  return (
    <div className="breadcrumb grid">
      <div className="breadcrumb__container">
        {!!breadcrumbList.length && (
          <ul>
            {breadcrumbList.map((elem) => {
              const {id, name} = elem;

              return (
                <li key={id}>
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
