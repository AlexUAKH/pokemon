import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAll } from "../../services/pokemonService";
import {
  EStatus,
  IPokemon,
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

// export const {fetchAllPokemons} = pokemonSlice.actions;

export default pokemonSlice.reducer;

export const selectAllPokemons = (state: any) => {
  return state.pokemon.pokemons;
};
