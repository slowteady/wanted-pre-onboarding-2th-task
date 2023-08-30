import React from 'react';
import styled from 'styled-components';
import IssuesList from '../../components/issues/IssuesList';

const HEADER = {
  ORGANIZATION_NAME: 'Facebook',
  REPOSITORY_NAME: 'React',
};

function Issues() {
  return (
    <>
      <Header>
        {HEADER.ORGANIZATION_NAME} / {HEADER.REPOSITORY_NAME}
      </Header>
      <IssuesList />
    </>
  );
}

const Header = styled.header`
  font-size: 32px;
  margin: 0 0 25px;
  border-bottom: 1px solid black;
`;
export default Issues;
