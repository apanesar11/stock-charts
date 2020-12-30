import { UiActionTypes } from './ui.types';

const UiContextReducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case UiActionTypes.TOGGLE_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: !state.showDeleteModal
      };
    case UiActionTypes.TOGGLE_SEARCH_OVERLAY:
      return {
        ...state,
        showSearchOverlay: !state.showSearchOverlay
      };
    case UiActionTypes.TOGGLE_DASHBOARD_LOADING:
      return {
        ...state,
        dashboardLoading: !state.dashboardLoading
      }
    default:
      return state;
  }
}

export default UiContextReducer;
