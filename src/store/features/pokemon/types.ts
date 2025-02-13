export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  sprites: { front_default: string };
  species: {
    name: string,
    url: string
  }
};

export type PokemonListApiResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type PokemonList = {
  count: number;
  next: string;
  previous: string | null;
  data: Pokemon[];
};
