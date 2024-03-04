import React from 'react';

import { Outlet } from 'react-router-dom';

import logo from '../../assets/img/logo.png';

import './layout.scss';

interface Props {
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <img className="logo" src={logo} alt={logo} />
      <div className="layout-content">{children ?? <Outlet />}</div>
    </div>
  );
};
