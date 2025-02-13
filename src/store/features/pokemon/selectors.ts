import { RootState } from "@store/index";

export const selectAllPokemon = (state: RootState) => state.pokemon.data;
export const selectInitailizeState = (state: RootState) => state.pokemon.loading;
