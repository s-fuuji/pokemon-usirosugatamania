import { combineReducers } from "@reduxjs/toolkit";
import { gotReducer } from "./gotPokemonSlicer";
import { triedQuizReducer } from "./triedQuizSlicer";

const rootReducer = combineReducers({
  capturedPoke: gotReducer,
  triedQuizData: triedQuizReducer,
});

export default rootReducer;
