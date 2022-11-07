import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";
import { getAll } from "../../services/pokemonService";
import {
  EStatus,
  IPokemonListItem,
  PokemonActionsType,
  PokemonState,
} from "../../types/pokemon";

export const fetchPokemons = createAsyncThunk(
  `pokemon/${PokemonActionsType.FETCH_POKEMONS}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAll();

      if (response.status !== 200) {
        throw new Error("error");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: PokemonState = {
  pokemons: [] as IPokemonListItem[],
  filteredPokemons: [] as IPokemonListItem[],
  status: EStatus.IDLE,
  error: null,
  types: [],
  activeType: "",
  searchQuery: "",
  page: 1,
  limit: 12,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setTypes: (state, action: PayloadAction<string[]>) => {
      const types = action.payload.filter((el) => !state.types.includes(el));
      state.types.push(...types);
    },
    addType: (state, action: PayloadAction<string>) => {
      state.activeType = action.payload;
    },
    delType: (state) => {
      state.activeType = "";
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.trim();
      state.types = [];
      state.activeType = "";
      state.page = 1;
    },
    nextPage: (state) => {
      state.page++;
      state.types = [];
      state.activeType = "";
    },
    prevPage: (state) => {
      state.page--;
      state.types = [];
      state.activeType = "";
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.fulfilled, (state, action: any) => {
        state.status = EStatus.RESOLVED;
        state.pokemons.push(...action.payload.results);
      })
      .addCase(fetchPokemons.pending, (state: PokemonState) => {
        state.status = EStatus.LOADING;
      })
      .addCase(fetchPokemons.rejected, (state: PokemonState, action: any) => {
        state.status = EStatus.REJECTED;
        state.error = action.payload;
      });
  },
});

export const {
  setTypes,
  addType,
  delType,
  setSearchQuery,
  nextPage,
  prevPage,
  setLimit,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;

// selectors
// TODO move to separate file

export const getStatus = (state: RootState): EStatus => state.pokemon.status;

export const getPokemons = (state: RootState): IPokemonListItem[] => {
  return state.pokemon.pokemons;
};

export const getFilteredPokemons = (state: RootState): IPokemonListItem[] => {
  return state.pokemon.filteredPokemons;
};

export const getTypes = (state: RootState): string[] => state.pokemon.types;

export const selectedType = (state: RootState): string =>
  state.pokemon.activeType;

export const getSearchQuery = (state: RootState): string =>
  state.pokemon.searchQuery;

export const getPage = (state: RootState): number => state.pokemon.page;

export const getLimit = (state: RootState): number => state.pokemon.limit;
