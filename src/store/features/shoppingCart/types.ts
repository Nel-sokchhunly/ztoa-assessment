import { Pokemon } from "../pokemon/types";

export type Carts = {
	[key: string]: PokemonCartItem
}

export type PokemonCartItem = Pokemon & {
	amount: number
	selected: boolean
}
