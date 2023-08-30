import React, { forwardRef } from 'react';
import styled from 'styled-components';

const WANTED = {
  IMG_URL: process.env.REACT_APP_WANTED_IMG_URL,
  URL: process.env.REACT_APP_WANTED_URL,
};

function AdBanner(props, ref) {
  return (
    <Li ref={ref}>
      <a href={WANTED.URL}>
        <img alt="AdBanner" src={WANTED.IMG_URL} />
      </a>
    </Li>
  );
}

const Li = styled.li`
  margin: 10px 0;
  display: flex;
  height: 60px;
  border-bottom: 1px solid #dcd2d2;
  align-items: center;
  justify-content: center;
`;

export default forwardRef(AdBanner);
