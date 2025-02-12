import { RootState } from "@store/index";

export const selectAllPokemon = (state: RootState) => state.pokemon.data;
