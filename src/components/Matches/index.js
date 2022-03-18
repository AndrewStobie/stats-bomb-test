import React from 'react';
import styled, { css } from 'styled-components';
import { navigate, useLocation } from '@reach/router';
import BackButton from '../BackButton';

const StyledMatchesContainer = styled.div`
  display: grid;
  row-gap: 1rem;
  column-gap: 0.5rem;
  margin: 0.5rem 0.25rem;
  ${(props) =>
    !props.isSummary
      ? css`
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        `
      : css`
          grid-template-columns: 1fr;
        `};
  > div {
    display: contents;
  }
`;

const goBack = () => {
  navigate(-1);
};

function Matches({ children }) {
  const location = useLocation();
  const isSummary = location.pathname !== '/matches';

  return (
    <StyledMatchesContainer isSummary={isSummary}>
      {isSummary ? <BackButton text="< Back" /> : null}
      {children}
    </StyledMatchesContainer>
  );
}

export default Matches;
