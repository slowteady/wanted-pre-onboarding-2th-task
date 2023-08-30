import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getIssuesList } from '../../api/issuesApi';
import AdBanner from '../../components/issues/AdBanner';
import { ERROR_MESSAGES } from '../../utils/message/errorMessages';
import IssuesItem from './IssuesItem';

const QUERY_PARAMS = {
  state: 'open',
  sort: 'comments',
  direction: 'desc',
  per_page: 10,
};

function IssuesList() {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);

  const params = useMemo(() => {
    return {
      params: {
        ...QUERY_PARAMS,
      },
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getIssuesList(params, page);
        if (response.status === 200) {
          setIssues((prevIssues) => [...prevIssues, ...response.data]);
        } else {
          const msg = response.data.message ? response.data.message : ERROR_MESSAGES.REQUEST_FAILED;
          throw new Error(msg);
        }
      } catch (err) {
        if (err instanceof Error) {
          alert(`Error: ${err.message}`);
        } else {
          alert(ERROR_MESSAGES.REQUEST_FAILED);
        }
      }
    }
    fetchData();
  }, [params, page]);

  return (
    <Ul>{issues.map((issue, index) => ((index + 1) % 5 === 0 ? <AdBanner /> : <IssuesItem issues={issue} />))}</Ul>
  );
}

const Ul = styled.ul`
  max-height: 600px;
  width: 650px;
  padding: 0px;
`;

export default IssuesList;
