import {
    createEntityAdapter,
    createSelector,
    createSlice,
  } from "@reduxjs/toolkit";
  
  export const HOME_INITIAL_STATE = {
    
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
      
    },
  });
  
  export const homeReducer = homeSlice.reducer;
  export const homeActions = homeSlice.actions;
  export const { selectAll, selectEntities } = homeAdapter.getSelectors();
  export const getHomeState = (rootState) => rootState[HOME_FEATURE_KEY];
  export const selectAllHome = createSelector(getHomeState, selectAll);
  export const selectHomeEntities = createSelector(getHomeState, selectEntities);
  