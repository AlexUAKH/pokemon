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
  status: null,
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemons.fulfilled, (state, action: any) => {
        state.status = EStatus.RESOLVED;
        state.pokemons.push(...action.payload.results);
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

export const { addType, delType } = pokemonSlice.actions;

export default pokemonSlice.reducer;

export const selectAllPokemons = (state: RootState) => state.pokemon.pokemons;

export const selectedTypes = (state: RootState): string =>
  state.pokemon.activeType;
