import React from 'react';

import { Outlet } from 'react-router-dom';

import './layout.scss';

interface Props {
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <div className="layout-content">{children ?? <Outlet />}</div>
    </div>
  );
};
