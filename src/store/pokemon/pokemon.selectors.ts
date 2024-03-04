import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootStore.ts';

const getState = (state: RootState) => state.pokemon;
export const pokemonsListSelector = createSelector(getState, (state) => state.pokemonsList);

export const pokemonsTypesSelector = createSelector(getState, (state) => state.pokemonTypes);

export const selectedTypeSelector = createSelector(getState, (state) => state.selectedType);
