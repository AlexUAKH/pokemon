export interface IPokemon {
  name: string;
  url: string;
}

export interface PokemonState {
  pokemons: IPokemon[];
  status: EStatus | null;
  error: string | null;
}

export enum EStatus {
  LOADING = "loading",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export enum PokemonActionsType {
  FETCH_POKEMONS = "FETCH_POKEMONS",
  FETCH_POKEMONS_ERROR = "FETCH_POKEMONS_ERROR",
}

interface FetchPokemonsAction {
  type: PokemonActionsType.FETCH_POKEMONS;
  payload: IPokemon[];
}

interface FetchPokemonsErrorAction {
  type: PokemonActionsType.FETCH_POKEMONS_ERROR;
  payload: string;
}

export type PokemonsAction = FetchPokemonsAction | FetchPokemonsErrorAction;
