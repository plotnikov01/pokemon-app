import React from 'react';

import { useNavigate } from 'react-router';

import './pokemon.scss';

interface Props {
  name: string;
  url: string;
}

export const Pokemon: React.FC<Props> = (props) => {
  const { name, url } = props;

  const navigate = useNavigate();

  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    url.split('/').slice(-2)[0]
  }.png`;

  const openPokemonData = () => {
    navigate(`${name}`);
  };

  return (
    <div className="pokemon" onClick={openPokemonData}>
      <img src={imgUrl} alt="" />
      <h2>{name}</h2>
    </div>
  );
};
