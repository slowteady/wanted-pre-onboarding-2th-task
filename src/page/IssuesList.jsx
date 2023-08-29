import React, { useEffect, useMemo } from "react";
import { getIssuesList } from "../api/issuesApi";
import { ERROR_MESSAGES } from "../utils/errorMessages";

const QUERY_PARAMS = {
  state: "open",
  sort: "comments",
  direction: "desc",
  per_page: 10,
};

function IssuesList() {
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
        const response = await getIssuesList(params);
        if (response.status === 200) {
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
  }, [params]);

  return <div>IssuesList</div>;
}

export default IssuesList;
