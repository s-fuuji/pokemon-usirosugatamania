import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GotPokemonState = number[]

const initialState: GotPokemonState = []

const gotPokemonSlice = createSlice({
  name: "got",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    },
    goodbye: (state, action: PayloadAction<number>) => {
      const newState = state.filter((g) => {
        return g !== action.payload;
      });
      return newState;
    },
  },
});



export const { get, goodbye } = gotPokemonSlice.actions;
export const gotReducer = gotPokemonSlice.reducer;


