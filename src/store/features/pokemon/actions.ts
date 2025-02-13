import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pokemon, PokemonList, PokemonListApiResponse } from "./types";

export const getPokemons = createAsyncThunk(
  "pokemon/getPokemons",
  async (
    {
      limit = 100,
      offset = 0,
    }: { limit?: number; offset?: number }
  ) => {
    try {
      const optsQuery = `?limit=${limit}&offset=${offset}`;
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon" + optsQuery
      );
      const list = (await response.json()) as PokemonListApiResponse;

      const details = list.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );

      const detailResults = await Promise.allSettled(details);

      const items = detailResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => {
          const pokemon = result.value as Pokemon;
          const price = Math.floor(Math.random() * 100); // simulate pricing

          return {
            id: pokemon.id,
            name: pokemon.name,
            base_experience: pokemon.base_experience,
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities,
            sprites: {
              front_default: pokemon.sprites.front_default,
            },
            species: pokemon.species,
            price,
          };
        }) satisfies Pokemon[];

      return {
        count: list.count,
        next: list.next,
        previous: list.previous,
        data: items,
      } satisfies PokemonList;
    } catch (err) {
      return null;
    }
  }
);
