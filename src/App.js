import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store/index';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import ProductDetail from './components/Product-detail';
import ProductList from './components/Product-list';
import LayoutContainer from './container/LayoutContainer';

function RouterRenderView ({match}){
  const {path, isExact} = match;
  let RouterRenderView = null;

  if (path === '/items' && isExact) {
    RouterRenderView = <ProductList/>;
  }

  if (path === '/items/:id' && isExact) {
    RouterRenderView = <ProductDetail/>;
  }

  if (path === '/' && isExact) {
    RouterRenderView = <ProductList/>;
  }

  return <LayoutContainer>{RouterRenderView}</LayoutContainer>;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LayoutContainer>
          <Header />
          <Breadcrumb />
        </LayoutContainer>
        <Route path="/" exact component={RouterRenderView} />
        <Route path="/items/:id" exact component={RouterRenderView} />
        <Route path="/items" component={RouterRenderView} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;