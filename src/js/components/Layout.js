import React from 'react';
import {StateProvider} from '../context/StateContext';

function Layout({children}) {
  return (
    <StateProvider>
      {children}
    </StateProvider>
  );
}

export default Layout;