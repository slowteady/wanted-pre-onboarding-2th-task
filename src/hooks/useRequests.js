import { useEffect, useState } from 'react';
import { ERROR_MESSAGES } from '../utils/message/errorMessages';

const changeObjProps = (issue) => {
  const {
    number,
    title,
    user: { login, avatar_url },
    created_at,
    comments,
    body,
  } = issue;

  return {
    number,
    title,
    login,
    avatar_url,
    created_at,
    comments,
    body,
  };
};

function useRequests(fetchFunction, params) {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetchFunction(params);
        if (response.status === 200 && Array.isArray(response.data)) {
          const newIssues = response.data.map((issue) => {
            return changeObjProps(issue);
          });

          setIssues((prevIssues) => [...prevIssues, ...newIssues]);
          setHasNextPage(Boolean(newIssues.length));
          setIsLoading(false);
        } else if (response.status === 200 && typeof response.data === 'object') {
          const newIssues = changeObjProps(response.data);
          setIssues(newIssues);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);

          const msg = response.data.message ? response.data.message : ERROR_MESSAGES.REQUEST_FAILED;
          throw new Error(msg);
        }
      } catch (err) {
        setIsLoading(false);
        setIsError(true);

        if (err instanceof Error) {
          alert(`Error: ${err.message}`);
        } else {
          alert(ERROR_MESSAGES.REQUEST_FAILED);
        }
      }
    }
    fetchData();
  }, [fetchFunction, params]);

  return { issues, isLoading, isError, hasNextPage };
}

export default useRequests;
