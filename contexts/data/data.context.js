import React, { useReducer, useEffect } from 'react';
import DataContextReducer from './data.reducer';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const initialState = {
    stockData: [],
    selectedStock: null,
    views: [],
    currentView: null
  };
  const [state, dispatch] = useReducer(DataContextReducer, initialState);

  useEffect(() => {
    localStorage.setItem('views', JSON.stringify(state.views));
  }, [state.views])

  return(
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
