import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

const StyledTeamInfo = styled.div`
  width: 100%;
  > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.toggleBorder};
    padding: 0.5rem 1rem;

    ${(props) =>
      props.isAway &&
      css`
        border-left: 1px solid ${({ theme }) => theme.colors.toggleBorder};
      `};
  }
`;

const StyledTeam = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.isAway &&
    css`
      flex-direction: row-reverse;
    `};

  .team-name {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    display: inline;
    font-weight: bolder;
    /* font-size: 1.5rem; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ winner, theme }) =>
      !winner &&
      css`
        color: ${theme.colors.altTextColor};
      `};

    ${(props) =>
      props.isAway
        ? css`
            &:after {
              content: ' ';
              background: ${({ theme, teamColor }) =>
                teamColor != null ? teamColor : theme.colors.altTextColor};
              width: 16px;
              height: 16px;
              margin: 0 0px 0 8px;
              display: inline-block;
              border-radius: 50%;
            }
          `
        : css`
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
          `}

    &:hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.teamColor};
    }

    &:empty {
      height: 1.5rem;
    }
  }
`;

const StyledStatsContainer = styled.div`
  --repeat: auto-fit;
  width: 100%;
  display: grid;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    --repeat: 2;
  }

  grid-template-columns: repeat(var(--repeat, auto-fit), minmax(310px, 1fr));
  .stat-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.25rem 1rem;
  }
`;

function getTeamStatEls(stats) {
  let statEls = [];

  for (const stat in stats) {
    statEls.push(
      <div key={stat} className="stat-container">
        <div className="stat-name">{stat.replace('_', ' ')}</div>
        <div className="stat-value">
          {stats[stat] % 1 > 0 ? stats[stat].toFixed(2) : stats[stat]}
        </div>
      </div>,
    );
  }

  return statEls;
}

function TeamInfo({
  id,
  color = '#6e6e6e',
  name = '',
  teamStats = {},
  players = [],
}) {
  return (
    <StyledTeamInfo teamColor={color}>
      <StyledTeam teamColor={color}>
        <Link to={`/teams/${id}`} className="team-name">
          {name}
        </Link>
      </StyledTeam>
      <StyledStatsContainer>{getTeamStatEls(teamStats)}</StyledStatsContainer>
    </StyledTeamInfo>
  );
}

export default TeamInfo;
