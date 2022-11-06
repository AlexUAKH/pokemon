export interface IPokemon {
  abilities: string[];
  base_experience: number;
  forms: string;
  height: number;
  id: number;
  moves: string[];
  name: string;
  species: string;
  sprites: ISprites[];
  stats: IStatsItem[];
  types: string;
  weight: number;
}

export interface ISprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
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
