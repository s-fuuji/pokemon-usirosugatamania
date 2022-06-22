import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: number[] = [];

const gotPokemonSlice = createSlice({
  name: "capturedPoke",
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


