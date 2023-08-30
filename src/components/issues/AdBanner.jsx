import React from 'react';
import styled from 'styled-components';

const WANTED = {
  IMG_URL:
    'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100',
  URL: 'https://www.wanted.co.kr/',
};

function AdBanner() {
  return (
    <Li>
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

export default AdBanner;
