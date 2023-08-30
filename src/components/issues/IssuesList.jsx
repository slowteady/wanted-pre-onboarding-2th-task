import React, { memo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import AdBanner from '../../components/issues/AdBanner';
import IssuesItem from '../../components/issues/IssuesItem';

function IssuesList({ issues, hasNextPage, setPage }) {
  const observer = useRef();

  const lastIssueRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((node) => {
        if (node[0].isIntersecting && hasNextPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasNextPage, setPage]
  );

  return (
    <Ul>
      {issues.map((issue, index) => {
        if (issues.length === index + 1) {
          return (index + 1) % 5 === 0 ? (
            <AdBanner ref={lastIssueRef} key={index} />
          ) : (
            <IssuesItem ref={lastIssueRef} key={issue.number} issues={issue} />
          );
        }
        return (index + 1) % 5 === 0 ? <AdBanner key={index} /> : <IssuesItem key={issue.number} issues={issue} />;
      })}
    </Ul>
  );
}

const Ul = styled.ul`
  max-height: 600px;
  width: 700px;
  padding: 0px;
  overflow: auto;
`;

export default memo(IssuesList);
