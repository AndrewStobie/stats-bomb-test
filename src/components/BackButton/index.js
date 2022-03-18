import React from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';

const StyledBackButton = styled.button`
  margin: 0.5rem 0rem;
  /* font-size: 1.5rem; */
  display: flex;
  color: ${({ theme }) => theme.colors.accentColor};
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0;

  :focus {
    color: ${({ theme }) => theme.colors.secondaryColor};
  }
`;

const goBack = () => {
  navigate(-1);
};

function BackButton({ text }) {
  return <StyledBackButton onClick={goBack}>{text}</StyledBackButton>;
}

export default BackButton;
