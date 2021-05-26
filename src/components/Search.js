import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';

const Search = ({fetchItems}) => {
  const history = useHistory();
  const {search, pathname} = useLocation();
  const values = queryString.parse(search);
  const queryValue = values.search;
  
  const [searchValue, setSearchValue] = useState(queryValue);
  const [isValidSearch, setValidSearch] = useState(false);

  const submit = (event) => {
    event.preventDefault();

    fetchItems({searchValue, pathname});
    history.push(`/items?search=${searchValue}`);
  }

  const onChangeHandler = (event) => {
    const evenTargetValue = event.target.value;

    if (!evenTargetValue) {
      setValidSearch(false);
      return;
    }

    setSearchValue(event.target.value);
    setValidSearch(true);
  }

  return (
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
      disabled={!isValidSearch}
      className="search__cta"
      type="submit"
      aria-label="Search">
        <img alt="" src="/images/ic_Search@2x.png"/>
      </button>
    </form>
  );
};

export default Search;
