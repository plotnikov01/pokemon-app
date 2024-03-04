import React from 'react';

import { Navigate, Routes, Route } from 'react-router-dom';
import { Layout } from '../components';
import { Home, PokemonPage } from '../features';

import './App.scss';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<PokemonPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
