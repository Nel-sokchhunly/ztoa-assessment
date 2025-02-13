import { RootState } from "@store/index";

export const selectModalVisibility = (state: RootState) => state.pokemonDetailSheet.visible;
export const selectActiveDetailPokemon = (state: RootState) => state.pokemonDetailSheet.activePokemon;

