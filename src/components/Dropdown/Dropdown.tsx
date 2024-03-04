import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemonsByTypes, selectedTypeSelector, setSelectedType } from '../../store/pokemon';

import { AppDispatch } from '../../app/rootStore.ts';

import './dropdown.scss';

interface Props {
  types: {
    name: string;
    url: string;
  }[];
}

export const Dropdown: React.FC<Props> = (props) => {
  const { types } = props;

  const selectedType: string | undefined = useSelector(selectedTypeSelector);
  const dispatch: AppDispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (selectedValue: string) => {
    dispatch(setSelectedType(selectedValue));
    setIsOpen(false);

    await dispatch(fetchPokemonsByTypes(selectedValue));
  };

  return (
    <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
      <div className="selected" onClick={toggleDropdown}>
        {selectedType || 'Select'}
      </div>
      {isOpen && (
        <ul className="options">
          {types &&
            types.map((option) => (
              <li key={option.name} onClick={() => handleOptionClick(option.name)}>
                {option.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
