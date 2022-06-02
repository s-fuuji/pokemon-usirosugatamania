import { createSlice } from "@reduxjs/toolkit";

const gotSlice = createSlice({
  name: "got",
  initialState: [],
  reducers: {
    get: (state, action) => {
      state.push(action.payload);
    },
    goodbye: (state, action) => {
      const newState = state.filter((g) => {
        return g !== action.payload;
      });
      return newState;
    },
  },
});

const triedQuizSlice = createSlice({
  name: "triedQuiz",
  initialState: {
    red: "未挑戦",
    gold: "未挑戦",
    ruby: "未挑戦",
  },
  reducers: {
    triedQuizCount: (state, action) => {
      state.red = `${action.payload.numCorrect}/${action.payload.numQuestion}問クリア`;
    },
  },
});

export const { get, goodbye } = gotSlice.actions;
export const gotReducer = gotSlice.reducer;

export const { triedQuizCount } = triedQuizSlice.actions;
export const triedQuizReducer = triedQuizSlice.reducer;
