import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

export type storeState = ReturnType<typeof store.getState>