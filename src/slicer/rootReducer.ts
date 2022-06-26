import { combineReducers } from '@reduxjs/toolkit'
import { gotReducer } from './gotPokemonSlicer'
import { triedQuizResulltReducer } from './triedQuizSlicer'

const rootReducer = combineReducers({
  capturedPoke: gotReducer,
  triedQuizResulltData: triedQuizResulltReducer,
})

export default rootReducer
