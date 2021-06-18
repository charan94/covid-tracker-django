import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { homeReducer, HOME_FEATURE_KEY } from "./home.reducer";

const store = configureStore({
    reducer: {
        [HOME_FEATURE_KEY]: homeReducer
    },
    middleware: [...getDefaultMiddleware()],
    enhancers: [],
    serializableCheck: false,
});

export default store;