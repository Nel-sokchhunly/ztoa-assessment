import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { Pokemon } from "../pokemon/types";
import { Carts, PokemonCartItem } from "./types";

type State = {
	cart: Carts
	isAllSelected: boolean
}

const cartSlice = createSlice({
	name: 'shoppingCartSlice',
	initialState: {
		cart: {},
		isAllSelected: false
	} satisfies State as State,
	reducers: {
		addToCart(state, payload: PayloadAction<Pokemon>) {
			const pokemon = payload.payload
			// check if the item already exist in cart, increase the amount by one
			const item = state.cart[pokemon.id] satisfies PokemonCartItem

			// not exist in the cart
			if (item === undefined) {
				// add as a new key with added amount to 1
				const copyItem = JSON.parse(JSON.stringify(pokemon))
				state.cart[pokemon.id] = {
					...copyItem,
					amount: 1,
					selected: false
				}
				state.isAllSelected = false // reset back to false because of new added

				console.log('added', state.cart)
				return
			}

			// from here mean the item already existed, increment the amount
			state.cart[pokemon.id].amount += 1

			console.log(state.cart)
		},
		removeFromCartByIds(state, payload: PayloadAction<Array<Pokemon['id']>>) {
			const carts = state.cart
			const ids = payload.payload

			ids.forEach(id => {
				delete carts[id]
			})

			state.cart = carts
		},
		clearCart(state) {
			state.cart = {}
		},
		toggleSelectItemInCart(state, payload: PayloadAction<Pokemon['id']>) {

			const updatedSelect = !state.cart[payload.payload].selected

			// update selected state
			state.cart[payload.payload].selected = !state.cart[payload.payload].selected

			// if updatedSelect is true, check if all item is selected
			if (updatedSelect) {
				const isAllSelected = !Object.entries(state.cart).some(([_, value]) => value.selected === false)
				console.log('is', isAllSelected)
				state.isAllSelected = isAllSelected
			} else {
				// reset all selected state back to false
				state.isAllSelected = false
			}
		},
		toggleSelectAll(state) {
			state.isAllSelected = !state.isAllSelected
			Object.entries(state.cart).forEach(([key, value]) => {
				state.cart[key].selected = state.isAllSelected
			})
		}

	}
})

const persistConfig = {
	key: "shoppingCartSlice",
	storage: AsyncStorage,
};

const shoppingCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const ShoppingCartActions = cartSlice.actions
export default shoppingCartReducer;
