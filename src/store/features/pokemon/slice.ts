import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "./types";

type InitialState = {
  data: Pokemon[];
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: [
      {
        name: "test",
        detail: {
          data: "test",
        },
      },
    ],
  } as InitialState,
  reducers: {}, // For non-async actions
});

export default pokemonSlice.reducer;
