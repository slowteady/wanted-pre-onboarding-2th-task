import React from 'react';
import styled from 'styled-components';

function Error() {
  return (
    <ErrorPageContainer>
      <ErrorDescription>에러가 발생했거나 찾을 수 없는 페이지 입니다.</ErrorDescription>
    </ErrorPageContainer>
  );
}

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;
const ErrorDescription = styled.p`
  font-size: 1.5rem;
`;

export default Error;
