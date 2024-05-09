import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "../slices/productsSlice";
import categoriesReducer from "../slices/categorySlice";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
