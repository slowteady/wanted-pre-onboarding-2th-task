import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const changeDateFormat = (createAt) => {
  const date = new Date(createAt);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

function IssuesItem({ issues }, ref) {
  const navigate = useNavigate();

  const { number, title, login, created_at, comments } = issues;

  const naviDetail = () => {
    navigate(`/issues/${number}`);
  };

  return (
    <Li key={number} ref={ref}>
      <IssuesDiv>
        <IssuesNumTitleDiv>
          <IssueNumSpan>{number}</IssueNumSpan>
          <IssueTitleSpan onClick={naviDetail} title={title}>
            {title}
          </IssueTitleSpan>
        </IssuesNumTitleDiv>
        <IssueDateWriterDiv>
          <span>
            작성자: {login}, 작성일: {changeDateFormat(created_at)}
          </span>
        </IssueDateWriterDiv>
      </IssuesDiv>
      <IssueCommentSpan>코멘트: {comments}</IssueCommentSpan>
    </Li>
  );
}

const Li = styled.li`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #dcd2d2;
  align-items: center;
`;

const IssuesDiv = styled.div`
  margin: 5px 0 10px;
`;

const IssuesNumTitleDiv = styled.div`
  max-width: 550px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 17px;
`;

const IssueNumSpan = styled.span`
  font-weight: bold;
  margin: 10px;
`;

const IssueTitleSpan = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

const IssueDateWriterDiv = styled.div`
  margin: 4px 0 0 10px;
  color: gray;
`;

const IssueCommentSpan = styled.span`
  margin: 0 10px 5px;
`;

export default forwardRef(IssuesItem);
