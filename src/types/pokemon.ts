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
  filteredPokemons: IPokemonListItem[];
  status: EStatus;
  error: string | null;
  types: string[];
  activeType: string;
  searchQuery: string;
  page: number;
  limit: number;
}

export enum EStatus {
  IDLE = "idle",
  LOADING = "loading",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export enum PokemonActionsType {
  FETCH_POKEMONS = "FETCH_POKEMONS",
  FETCH_POKEMONS_ERROR = "FETCH_POKEMONS_ERROR",
}
