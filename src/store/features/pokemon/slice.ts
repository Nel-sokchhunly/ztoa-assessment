import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "./types";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const persistConfig = {
  key: "pokemon",
  storage: AsyncStorage,
};

const pokemonReducer = persistReducer(persistConfig, pokemonSlice.reducer);

export default pokemonReducer;
