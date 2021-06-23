import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { loadCountryStatsAction, loadGeneralStatsAction } from "../actions/home.actions";

export const HOME_INITIAL_STATE = {
  generalSectionLoading: false,
  generalStats: null,
  generalStatsError: null,
  countryDataLoading: false,
  countryListData: null,
  countryDataError: null,
  selectedCountry: null
};

export const HOME_FEATURE_KEY = "home";
export const homeAdapter = createEntityAdapter();
export const initialAuthState = homeAdapter.getInitialState(
  HOME_INITIAL_STATE
);

export const homeSlice = createSlice({
  name: HOME_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGeneralStatsAction.pending, (state) => {
        state.generalSectionLoading = true;
        state.generalStats = null;
        state.generalStatsError = null;
      })
      .addCase(loadGeneralStatsAction.fulfilled, (state, action) => {
        state.generalSectionLoading = false;
        state.generalStats = null;
        const result = action?.payload;
        if (result && result.length) {
          state.generalStats = result[0]?.fields || null;
        }
      })
      .addCase(loadGeneralStatsAction.rejected, (state, action) => {
        state.generalSectionLoading = false;
        state.generalStats = null;
        state.generalStatsError = action?.error?.message;
      })
      .addCase(loadCountryStatsAction.pending, (state) => {
        state.countryDataLoading = true;
        state.countryListData = null;
        state.countryDataError = null;
      })
      .addCase(loadCountryStatsAction.fulfilled, (state, action) => {
        state.countryDataLoading = false;
        state.countryListData = null;
        const result = action?.payload;
        if (result) {
          state.countryListData = result || null;
        }
      })
      .addCase(loadCountryStatsAction.rejected, (state, action) => {
        state.countryDataLoading = false;
        state.countryListData = null;
        state.countryDataError = action?.error?.message;
      })
  },
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;
export const { selectAll, selectEntities } = homeAdapter.getSelectors();
export const getHomeState = (rootState) => rootState[HOME_FEATURE_KEY];
export const selectAllHome = createSelector(getHomeState, selectAll);
export const selectHomeEntities = createSelector(getHomeState, selectEntities);
