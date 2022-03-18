import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from '@reach/router';
import BackButton from '../BackButton';

const StyledTeamsContainer = styled.div`
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

function Teams({ children }) {
  const location = useLocation();
  const isSummary = location.pathname !== '/teams';

  return (
    <StyledTeamsContainer isSummary={isSummary}>
      {isSummary ? <BackButton text="< Back" /> : null}
      {children}
    </StyledTeamsContainer>
  );
}

export default Teams;
