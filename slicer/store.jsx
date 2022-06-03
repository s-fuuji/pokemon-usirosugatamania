import { configureStore } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
