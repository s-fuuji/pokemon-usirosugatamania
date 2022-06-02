import { combineReducers } from "@reduxjs/toolkit";
import { gotReducer, triedQuizReducer } from "./slicer";

const rootReducer = combineReducers({
  got: gotReducer,
  triedQuiz: triedQuizReducer,
});

export default rootReducer;
