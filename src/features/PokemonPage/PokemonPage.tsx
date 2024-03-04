import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { setSelectedType } from '../../store/pokemon';
import { getPokemonByName } from '../../api/pokemon.ts';

import { PokemonData, PokemonType } from '../../global';

import './pokemonPage.scss';

export const PokemonPage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { name } = useParams();

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPokemonByName(name);

        setPokemonData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const navigateToTypes = (type: string) => {
    dispatch(setSelectedType(type));
    navigate('/');
  };

  const renderImages = () => {
    return pokemonData?.sprites
      ? Object.keys(pokemonData.sprites).map((spriteKey, index) => {
          const spriteUrl = pokemonData.sprites[spriteKey];
          return typeof spriteUrl === 'string' ? (
            <img key={index} src={spriteUrl} alt={spriteKey} />
          ) : null;
        })
      : null;
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="not-found-wrapper">
        <h3 onClick={() => navigate('/')} className="back">
          &#10094; Go back
        </h3>
        <div className="not-found">
          <p>
            There&apos;s no Pokémon with name <span>&quot;{name}&quot;</span> =(
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemonPage">
      <div className="pokemonPage__content">
        <h3 onClick={() => navigate('/')} className="back">
          &#10094; Go back
        </h3>
        <div className="pokemonPage__content--images">{renderImages()}</div>
        <h1>
          Pokémon - <strong>{pokemonData.name}</strong>
        </h1>
        <div className="pokemonPage__content--types">
          <h1>Types:</h1>

          {pokemonData.types.map((type: PokemonType, index: number) => (
            <li onClick={() => navigateToTypes(type.type.name)} key={index}>
              {type.type.name}
            </li>
          ))}
        </div>
        <h2>Moves</h2>
        <div className="pokemonPage__content--moves">
          {pokemonData.moves.map((move) => (
            <p key={move.move.name}>{move.move.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
