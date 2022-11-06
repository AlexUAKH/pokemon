export interface IPokemon {
  abilities: string[];
  base_experience: number;
  forms: string;
  height: number;
  id: number;
  moves: string[];
  name: string;
  species: string;
  sprites: string;
  stats: IStatsItem[];
  types: string[];
  weight: number;
}

export interface IStatsItem {
  name: string;
  stat: number;
  effort: number;
}
export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface PokemonState {
  pokemons: IPokemonListItem[];
  status: EStatus | null;
  error: string | null;
  activeTypes: string[];
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
