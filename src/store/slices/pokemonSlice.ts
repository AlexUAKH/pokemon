import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";
import { getAll } from "../../services/pokemonService";
import {
  EStatus,
  IPokemonListItem,
  PokemonActionsType,
  PokemonState,
} from "../../types/pokemon";

export const fetchAllPokemons = createAsyncThunk(
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
  activeType: "",
  searchQuery: "",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addType: (state, action: PayloadAction<string>) => {
      state.activeType = action.payload;
    },
    delType: (state) => {
      state.activeType = "";
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    filterByName: (state) => {
      state.filteredPokemons = state.pokemons.filter((pokemon) =>
        pokemon.name.includes(state.searchQuery)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemons.fulfilled, (state, action: any) => {
        state.status = EStatus.RESOLVED;
        state.pokemons.push(...action.payload.results);
        state.filteredPokemons.push(...action.payload.results.slice(0, 20));
      })
      .addCase(fetchAllPokemons.pending, (state: PokemonState) => {
        state.status = EStatus.LOADING;
      })
      .addCase(
        fetchAllPokemons.rejected,
        (state: PokemonState, action: any) => {
          state.status = EStatus.REJECTED;
          state.error = action.payload;
        }
      );
  },
});

export const { addType, delType, setSearchQuery, filterByName } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;

export const getStatus = (state: RootState): EStatus => state.pokemon.status;

export const getFilteredPokemons = (state: RootState): IPokemonListItem[] =>
  state.pokemon.filteredPokemons;

export const selectedTypes = (state: RootState): string =>
  state.pokemon.activeType;

export const getSearchQuery = (state: RootState): string =>
  state.pokemon.searchQuery;
