import { createSelector } from 'reselect'
import { RootState } from "@store/index";
import { PokemonCartItem } from "./types";

export const selectCart = (state: RootState) => state.shoppingCart.cart
export const selectCartAsList = createSelector(
	[(state: RootState) => state.shoppingCart.cart],
	cart => {
		const list: PokemonCartItem[] = []

		Object.entries(cart).forEach(
			([_, value]) => list.push(value)
		)
		return list

	}
)
export const selectAllSelectedStatus = (state: RootState) => state.shoppingCart.isAllSelected
export const selectSelectedItems = createSelector(
	[(state: RootState) => state.shoppingCart.cart],
	cart => {
		const res: PokemonCartItem[] = []
		Object.entries(cart).forEach(([_, value]) => {
			if (value.selected) res.push(value)
		})
		return res
	}
)
