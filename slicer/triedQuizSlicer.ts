import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const { triedQuizCount } = triedQuizSlice.actions;
export const triedQuizReducer = triedQuizSlice.reducer;