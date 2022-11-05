import { configureStore } from "@reduxjs/toolkit";

import pokemonSlice from "./slices/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
