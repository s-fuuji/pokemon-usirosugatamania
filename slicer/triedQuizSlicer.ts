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
            state.red = `${action.payload.correctAnswersCount}/${action.payload.allQuestionNum}問クリア`;
        },
    },
});

export const { triedQuizCount } = triedQuizSlice.actions;
export const triedQuizReducer = triedQuizSlice.reducer;