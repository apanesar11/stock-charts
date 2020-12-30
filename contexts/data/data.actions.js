import { DataActionTypes } from './data.types';

export const updateStockData = data => ({
  type: DataActionTypes.UPDATE_STOCK_DATA,
  payload: data
});

export const deleteStockData = stock => ({
  type: DataActionTypes.DELETE_STOCK_DATA,
  payload: stock
});

export const updateSelectedStock = stock => ({
  type: DataActionTypes.UPDATE_SELECTED_STOCK,
  payload: stock
});
