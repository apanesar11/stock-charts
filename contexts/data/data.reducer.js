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
          stockData: [...state.stockData, { ticker: newTicker, data }],
          views: state.views.map(data => (
            data.view === state.currentView ? (
              {
                view: data.view,
                stocks : [...data.stocks, { ticker: newTicker }]
              }
            ) : data
          ))
        };
      }
    case DataActionTypes.DELETE_STOCK_DATA:
      return {
        ...state,
        stockData: state.stockData.filter(({ticker}) => ticker !== action.payload),
        views: state.views.map(data => (
          data.view === state.currentView ? (
            {
              view: data.view,
              stocks: data.stocks.filter(({ticker}) => ticker !== action.payload)
            }
          ) : data
        ))
      };
    case DataActionTypes.UPDATE_SELECTED_STOCK:
      return {
        ...state,
        selectedStock: action.payload
      }
    case DataActionTypes.UPDATE_STOCK_VIEWS:
      return {
        ...state,
        views: action.payload
      }
    case DataActionTypes.UPDATE_CURRENT_VIEW:
      const currentViewName = state.currentView;
      return {
        ...state,
        currentView: action.payload,
        views: state.views.map(data => data.view === currentViewName ? { view: action.payload, stocks: data.stocks } : data)
      }
    default:
      return state;
  }
}

export default DataContextReducer;
