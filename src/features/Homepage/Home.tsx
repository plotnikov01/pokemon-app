import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  fetchPokemonsByTypes,
  fetchPokemonsList,
  fetchPokemonsTypes,
  pokemonsListSelector,
  pokemonsTypesSelector,
  selectedTypeSelector,
} from '../../store/pokemon';

import { Dropdown, Pagination, Pokemon, SearchBar } from '../../components';

import { AppDispatch } from '../../app/rootStore.ts';
import { PokemonInterface } from '../../global';

import './home.scss';

export const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokemonsList = useSelector(pokemonsListSelector);
  const pokemonsTypes = useSelector(pokemonsTypesSelector);
  const selectedType = useSelector(selectedTypeSelector);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number | undefined>(
    localStorage.getItem('currentPage')
      ? parseInt(localStorage.getItem('currentPage') || '0', 10)
      : undefined,
  );
  const [searchValue, setSearchValue] = useState<string | null>('');

  useEffect(() => {
    dispatch(fetchPokemonsTypes());
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage !== null) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    fetchData();
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const fetchData = async () => {
    if (!selectedType) {
      const offset: number = currentPage * 20;
      await dispatch(fetchPokemonsList(`/pokemon?offset=${offset}&limit=20`));
    } else {
      await dispatch(fetchPokemonsByTypes(selectedType));
    }
  };

  const renderPokemons = () => {
    if (!selectedType) {
      return (
        <>
          {pokemonsList &&
            pokemonsList.results.map((pokemon: PokemonInterface) => (
              <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
        </>
      );
    } else if (pokemonsList?.pokemon) {
      return (
        <>
          {pokemonsList.pokemon.map((pokemon: PokemonInterface) => (
            <Pokemon
              key={pokemon.pokemon.name}
              name={pokemon.pokemon.name}
              url={pokemon.pokemon.url}
            />
          ))}
        </>
      );
    } else {
      return <div>No pokemons available.</div>;
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil((pokemonsList?.count || 0) / 20);

  const handleSearchBar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue?.trim() !== '') {
      navigate(`${searchValue?.toLowerCase()}`);
    }
  };

  return (
    <div className="home">
      <div className="home-filter">
        <SearchBar
          handleSearchBar={handleSearchBar}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue || ''}
          placeholder="Find Pokémon by name"
        />
        <Dropdown types={pokemonsTypes?.results} />
      </div>
      <div className="home-content">{renderPokemons()}</div>
      <div className="pagination">
        <Pagination
          handlePageChange={handlePageChange}
          pageCount={pageCount}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
