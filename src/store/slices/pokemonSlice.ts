import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  EStatus,
  IPokemon,
  PokemonActionsType,
  PokemonState,
} from "../../types/pokemon";

export const fetchAllPokemons = createAsyncThunk(
  `pokemon/${PokemonActionsType.FETCH_POKEMONS}`,
  async (limit: number = 20, { rejectWithValue }) => {
    try {
      const response = [] as IPokemon[];
      if (!response) {
        throw new Error("error");
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: PokemonState = {
  pokemons: [] as IPokemon[],
  status: null,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemons.fulfilled, (state, action: any) => {
        state.status = EStatus.RESOLVED;
        state.pokemons.push(action.payload);
      })
      .addCase(fetchAllPokemons.pending, (state: PokemonState) => {
        state.status = EStatus.LOADING;
      });
  },
});

// export const {fetchAllPokemons} = pokemonSlice.actions;

export default pokemonSlice.reducer;

export const selectAllPokemons = (state: PokemonState) => state.pokemons;
