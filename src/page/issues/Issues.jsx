import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import IssuesList from '../../components/issues/IssuesList';
import Loading from '../../components/loading/Loading';
import useRequests from '../../hooks/useRequests';
import IssuesDetail from './IssuesDetail';

const HEADER = {
  ORGANIZATION_NAME: 'Facebook',
  REPOSITORY_NAME: 'React',
};

const QUERY_PARAMS = {
  state: 'open',
  sort: 'comments',
  direction: 'desc',
  per_page: 10,
};

const INIT_PAGE = 1;

function Issues() {
  const [page, setPage] = useState(INIT_PAGE);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const params = useMemo(() => {
    return {
      params: {
        ...QUERY_PARAMS,
        page,
      },
    };
  }, [page]);

  const { issues, isLoading, isError, hasNextPage } = useRequests(params);

  if (isError) {
    navigate('/error');
  }

  return (
    <>
      <Header>
        {HEADER.ORGANIZATION_NAME} / {HEADER.REPOSITORY_NAME}
      </Header>
      {isLoading && <Loading />}
      {pathname.startsWith('/issues/') && id ? (
        <IssuesDetail issues={issues} />
      ) : (
        <IssuesList id={id} issues={issues} hasNextPage={hasNextPage} setPage={setPage} />
      )}
    </>
  );
}

const Header = styled.header`
  font-weight: bold;
  font-size: 32px;
  margin: 0 0 25px;
  border-bottom: 1px solid black;
`;

export default Issues;
