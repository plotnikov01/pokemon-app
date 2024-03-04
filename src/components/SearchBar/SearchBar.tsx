import React from 'react';

import './searchBar.scss';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  handleSearchBar: React.FormEventHandler<HTMLFormElement>;
  placeholder: string;
}

export const SearchBar: React.FC<Props> = (props) => {
  const { onChange, value, handleSearchBar, placeholder } = props;

  return (
    <form onSubmit={handleSearchBar} className="input-wrapper">
      <input placeholder={placeholder} value={value} onChange={onChange} type="text" />
      <button type="submit">Search</button>
    </form>
  );
};
