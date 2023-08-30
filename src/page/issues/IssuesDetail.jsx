import { marked } from 'marked';
import React, { memo } from 'react';
import styled from 'styled-components';
import IssuesItem from '../../components/issues/IssuesItem';

function IssuesDetail({ id, issues }) {
  const issueObj = issues.find((issue) => issue.number === parseInt(id));
  if (issueObj) {
    const { avatar_url, body } = issueObj;
    const htmlBody = marked(body);

    return (
      <IssueDetailDiv>
        <IssueImgItemDiv>
          <IssueDetailUserImg src={avatar_url} />
          <IssuesItem issues={issueObj} isDetail={true}/>
        </IssueImgItemDiv>
        <IssueContentDiv>
          <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
        </IssueContentDiv>
      </IssueDetailDiv>
    );
  }
}

const IssueDetailDiv = styled.div`
  max-height: 600px;
  width: 700px;
  padding: 0px;
  overflow: auto;
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
