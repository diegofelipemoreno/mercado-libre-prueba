import React, {createContext, useState} from 'react';

export const StateContext = createContext();

function StateProvider({children}) {
  const [data, setData] = useState([]);

  return (
    <StateContext.Provider value={{data, setData}}>
      {children}
    </StateContext.Provider>
  );
}

export {StateProvider};