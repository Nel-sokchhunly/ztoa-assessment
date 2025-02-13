import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import pokemonReducer from "@features/pokemon/slice";
import pokemonDetailSheetReducer from '@features/pokemonDetailSheet/slice'
import { getPokemons } from "@features/pokemon/actions";

const reducers = combineReducers({
  pokemon: pokemonReducer,
  pokemonDetailSheet: pokemonDetailSheetReducer
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

store.dispatch(getPokemons({}));

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export { store, persistor };
