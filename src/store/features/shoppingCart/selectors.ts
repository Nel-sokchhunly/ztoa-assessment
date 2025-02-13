import { RootState } from "@store/index";
import { PokemonCartItem } from "./types";

export const selectCart = (state: RootState) => state.shoppingCart.cart
export const selectCartAsList = (state: RootState) => {
	const list: PokemonCartItem[] = []

	Object.entries(state.shoppingCart.cart).forEach(
		([key, value]) => list.push(value)
	)
	return list
}
