import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonsList, fetchPokemonsTypes, fetchPokemonsByTypes } from './pokemon.actions.ts';

import { PokemonInterface } from '../../global';

interface InitialStateProps {
  pokemonsList?: {
    count: number;
    results: PokemonInterface[];
  };
  pokemonTypes?: {
    count: number;
    results: PokemonInterface[];
  };
  selectedType?: string;
  isLoading?: boolean;
}

const initialState: InitialStateProps = {
  pokemonsList: {
    count: 0,
    results: [],
  },
  pokemonTypes: {
    count: 0,
    results: [],
  },
  selectedType: '',
  isLoading: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPokemonsList.fulfilled, (state, action) => {
      state.pokemonsList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPokemonsList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchPokemonsTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPokemonsTypes.fulfilled, (state, action) => {
      state.pokemonTypes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPokemonsTypes.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchPokemonsByTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPokemonsByTypes.fulfilled, (state, action) => {
      state.pokemonsList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPokemonsByTypes.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSelectedType } = pokemonSlice.actions;

export default pokemonSlice.reducer;
