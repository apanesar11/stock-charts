import { DataActionTypes } from './data.types';

const DataContextReducer = (state, action) => {
  switch(action.type) {
    case DataActionTypes.UPDATE_STOCK_DATA:
      const { payload: { ticker: newTicker, data } } = action;
      const checkExists = state.stockData.filter(({ticker}) => ticker === newTicker).length > 0;
      if (checkExists) {
        return {...state};
      } else {
        return {
          ...state,
          stockData: [...state.stockData, { ticker: newTicker, data }]
        };
      }
    case DataActionTypes.DELETE_STOCK_DATA:
      return {
        state,
        stockData: state.stockData.filter(({ticker}) => ticker !== action.payload)
      };
    case DataActionTypes.UPDATE_SELECTED_STOCK:
      return {
        ...state,
        selectedStock: action.payload
      }
    default:
      return state;
  }
}

export default DataContextReducer;
