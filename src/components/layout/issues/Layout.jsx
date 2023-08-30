import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const HEADER = {
  ORGANIZATION_NAME: 'Facebook',
  REPOSITORY_NAME: 'React',
};

function Layout() {
  return (
    <>
      <Header>
        {HEADER.ORGANIZATION_NAME} / {HEADER.REPOSITORY_NAME}
      </Header>
      <Outlet />
    </>
  );
}

const Header = styled.header`
  font-weight: bold;
  font-size: 32px;
  margin: 0 0 40px;
  border-bottom: 1px solid black;
`;

export default Layout;
