import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import homeMessagePath from '../../assets/markdown/home.md';

const StyledHome = styled.section`
  width: 100%;
  top: 0;
  padding: 0 12px;

  img {
    width: 10vh;
  }
`;

function Home() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch(homeMessagePath)
      .then((res) => res.text())
      .then((text) => setMessage(text));
  }, []);

  return (
    <StyledHome>
      <ReactMarkdown children={message} />
    </StyledHome>
  );
}

export default Home;
