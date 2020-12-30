import { UiActionTypes } from './ui.types';

export const toggleDeleteModal = () => ({
  type: UiActionTypes.TOGGLE_DELETE_MODAL
});

export const toggleSearchOverlay = () => ({
  type: UiActionTypes.TOGGLE_SEARCH_OVERLAY
});

export const toggleDashboardLoading = () => ({
  type: UiActionTypes.TOGGLE_DASHBOARD_LOADING
});
