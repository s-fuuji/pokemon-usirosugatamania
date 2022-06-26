import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const triedQuizResulltSlice = createSlice({
  name: 'triedQuizResulltData',
  initialState: {
    red: '未挑戦',
  },
  reducers: {
    setTriedQuizResullt: (state, action) => {
      state.red = `${action.payload.correctAnswersCount}/${action.payload.allQuestionNum}`
    },
  },
})

export const { setTriedQuizResullt } = triedQuizResulltSlice.actions
export const triedQuizResulltReducer = triedQuizResulltSlice.reducer
