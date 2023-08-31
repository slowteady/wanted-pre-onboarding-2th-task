import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getIssuesDetail } from '../../api/issuesApi';
import IssuesItem from '../../components/issues/IssuesItem';
import Loading from '../../components/loading/Loading';
import useRequests from '../../hooks/useRequests';

function IssuesDetail() {
  const param = useParams();
  const id = param.id;
  const navigate = useNavigate();

  const { issues, isError, isLoading } = useRequests(getIssuesDetail, id);

  if (isError) {
    navigate('/error');
  }

  if (isLoading) {
    return <Loading />;
  }

  if (issues && Object.keys(issues).length > 0) {
    const { avatar_url, body } = issues;

    return (
      <IssueDetailDiv>
        <IssueImgItemDiv>
          <IssueDetailUserImg src={avatar_url} />
          <IssuesItem issues={issues} />
        </IssueImgItemDiv>
        <IssueContentDiv>
          <ReactMarkdown>{body}</ReactMarkdown>
        </IssueContentDiv>
      </IssueDetailDiv>
    );
  }
}

const IssueDetailDiv = styled.div`
  max-height: 600px;
  width: 800px;
  padding: 0px;
  overflow: auto;
  margin-top: 16px;
`;

const IssueImgItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  & > :nth-child(2) {
    flex: 1;
  }
`;

const IssueDetailUserImg = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  align-self: center;
  margin: 0 0 5px 10px;
`;

const IssueContentDiv = styled.div`
  margin: 30px 0;
`;

export default memo(IssuesDetail);
