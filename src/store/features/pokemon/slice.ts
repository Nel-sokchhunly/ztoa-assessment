import { createSlice } from "@reduxjs/toolkit";
import { Pokemon, PokemonList } from "./types";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPokemons } from "./actions";

type InitialState = {
  data: PokemonList | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: null,
    loading: "idle",
  } satisfies InitialState as InitialState,
  reducers: {}, // For non-async actions
  extraReducers: (builder) => {
    // For async actions
    builder.addCase(getPokemons.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getPokemons.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getPokemons.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

const persistConfig = {
  key: "pokemon",
  storage: AsyncStorage,
};

const pokemonReducer = persistReducer(persistConfig, pokemonSlice.reducer);

export default pokemonReducer;
