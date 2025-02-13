import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemon/types";

type initialState = {
	visible: boolean;
	activePokemon: Pokemon | null;
};

const pokemonDetailSheet = createSlice({
	initialState: {
		visible: false,
		activePokemon: null,
	} satisfies initialState as initialState,
	name: "bottomSheet",
	reducers: {
		showBottomSheet: (state, action: PayloadAction<Pokemon>) => {
			state.visible = true;
			state.activePokemon = action.payload;
		},
		hideBottomSheet: (state) => {
			state.visible = false;
			state.activePokemon = null;
		},
	}
})

export const pokemonDetailActions = pokemonDetailSheet.actions;
export default pokemonDetailSheet.reducer;
