import { apiClient } from './apiClient.ts';

export const getPokemons = (url?: string) => {
  return apiClient.get(url || '/pokemon');
};

export const getPokemonByName = (name?: string) => {
  return apiClient.get(`/pokemon/${name}`);
};

export const getPokemonTypes = () => {
  return apiClient.get('/type');
};

export const getPokemonsByTypes = (name?: string) => {
  return apiClient.get(`/type/${name}`);
};
