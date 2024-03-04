import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPokemons, getPokemonsByTypes, getPokemonTypes } from '../../api/pokemon.ts';

export const fetchPokemonsList = createAsyncThunk(
  'pokemons/fetch-pokemons',
  async (url?: string) => {
    try {
      const response = await getPokemons(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const fetchPokemonsTypes = createAsyncThunk('pokemons/fetch-pokemon-types', async () => {
  try {
    const response = await getPokemonTypes();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const fetchPokemonsByTypes = createAsyncThunk(
  'pokemons/fetch-pokemons-by-types',
  async (type: string) => {
    try {
      const response = await getPokemonsByTypes(type);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
