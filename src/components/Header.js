import React from 'react';

import Search from './Search';

const Header = (props) => {
  return (
    <header className="header grid">
      <div className="header__container">
        <a href="/" className="header__logo">
          <img alt="" src="/images/Logo_ML@2x.png"/>
          <h1 className="sr-only">Mercado libre</h1>
        </a> 
        <Search {...props}/>
      </div>
    </header>
  );
};

export default Header;
