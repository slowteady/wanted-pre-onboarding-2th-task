import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIssuesList } from '../../api/issuesApi';
import IssuesList from '../../components/issues/IssuesList';
import Loading from '../../components/loading/Loading';
import useRequests from '../../hooks/useRequests';

const QUERY_PARAMS = {
  state: 'open',
  sort: 'comments',
  direction: 'desc',
  per_page: 10,
};

const INIT_PAGE = 1;

function Issues() {
  const [page, setPage] = useState(INIT_PAGE);
  const navigate = useNavigate();

  const params = useMemo(() => {
    return {
      params: {
        ...QUERY_PARAMS,
        page,
      },
    };
  }, [page]);

  const { issues, isLoading, isError, hasNextPage } = useRequests(getIssuesList, params);

  if (isError) {
    navigate('/error');
  }

  return (
    <>
      {isLoading && <Loading />}
      <IssuesList issues={issues} hasNextPage={hasNextPage} setPage={setPage} />
    </>
  );
}

export default Issues;
