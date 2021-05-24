import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './js/common/Header';
import ProductDetail from './js/components/Product-detail';
import ProductList from './js/components/Product-list';
import Layout from './js/components/Layout';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/items/:id" exact component={ProductDetail} />
          <Route path="/items" component={ProductList} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
