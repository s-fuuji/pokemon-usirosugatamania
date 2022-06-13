import { combineReducers } from "@reduxjs/toolkit";
import { gotReducer } from "./gotPokemonSlicer";
import { triedQuizReducer } from "./triedQuizSlicer";

const rootReducer = combineReducers({
  got: gotReducer,
  triedQuiz: triedQuizReducer,
});

export default rootReducer;
