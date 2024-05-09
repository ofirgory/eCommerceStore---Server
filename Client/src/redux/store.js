import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});

export default store;
