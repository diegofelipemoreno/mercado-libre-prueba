import React, {useState, useContext, useEffect, useCallback} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';

import {StateContext} from '../context/StateContext';
import {requestService} from '../../services/requestService';

const Search = () => {
  const history = useHistory();
  const {setData} = useContext(StateContext);
  const {search} = useLocation();
  const values = queryString.parse(search);
  const queryValue = values.search;

  const [searchValue, setSearchValue] = useState(queryValue);

  const submit = async (event) => {
    event.preventDefault();
    getItemsFromRequest(searchValue);
    history.push(`/items?search=${searchValue}`);
  }

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value);
  }

  const getItemsFromRequest = useCallback(async(value) => {
    if (!value) {
      setData({});

      return;
    }

    const items = await requestService.getItemsBySearch(value);

    setData({items});
  }, [setData]);

  useEffect(() => {
    getItemsFromRequest(queryValue);
  }, [getItemsFromRequest, queryValue]);

  return (
    <>
      <form className="search" onSubmit={submit}>
        <label className="search__label sr-only" htmlFor="search">Search</label>
        <input 
        className="search__input"
        id="search" 
        type="search"
        autoComplete="off"
        placeholder="Nunca dejes de buscar" 
        onChange={onChangeHandler}/>
        <button 
        disabled={!searchValue}
        className="search__cta"
        type="submit"
        aria-label="Search">
          <img alt="" src="/images/ic_Search@2x.png"/>
        </button>
      </form>
    </>
  );
};

export default Search;
