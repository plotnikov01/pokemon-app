import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer from '../store/pokemon';

export const rootStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
