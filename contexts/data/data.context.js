import React, { useReducer, useEffect } from 'react';
import DataContextReducer from './data.reducer';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const initialState = {
    stockData: [],
    selectedStock: null
  };
  const [state, dispatch] = useReducer(DataContextReducer, initialState);

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(state.stockData));
  }, [state.stockData])

  return(
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
