import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

const StyledTeamHeader = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  min-width: 0;

  ${(props) =>
    !props.winner &&
    css`
      color: ${({ theme }) => theme.colors.altTextColor};
    `};

  .team-name {
    text-decoration: none;
    color: inherit;
    display: inline;
    font-weight: bolder;
    /* font-size: 1.5rem; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
      content: ' ';
      background: ${({ theme, teamColor }) =>
        teamColor != null ? teamColor : theme.colors.altTextColor};
      width: 16px;
      height: 16px;
      margin: 0 8px 0 0;
      display: inline-block;
      border-radius: 50%;
    }

    &:hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.teamColor};
    }

    &:empty {
      height: 1.5rem;
    }
  }
`;

function TeamHeader({
  id,
  color,
  isNameAnchor = true,
  name = '',
  score = '',
  record = '',
  penaltyScore,
  isWinner = true,
}) {
  return (
    <StyledTeamHeader teamColor={color} winner={isWinner}>
      {isNameAnchor ? (
        <Link to={`/teams/${id}`} className="team-name">
          {name}
        </Link>
      ) : (
        <div to={`/teams/${id}`} className="team-name">
          {name}
        </div>
      )}
      {score != null && score !== '' ? (
        <div className="score">{`${score}${
          penaltyScore != null ? `(${penaltyScore})` : ''
        }`}</div>
      ) : (
        record != null &&
        record !== '' && <div className="record">{record}</div>
      )}
    </StyledTeamHeader>
  );
}

export default TeamHeader;
