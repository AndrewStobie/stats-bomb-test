import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

const StyledTeamMatchInfo = styled.div`
  display: contents;

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

const StyledGoalScorerContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.toggleBorder};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  ${(props) =>
    props.isAway &&
    css`
      text-align: left;
    `};

  &:empty {
    height: 100%;
  }

  .scorer-info {
    text-decoration: none;
    color: inherit;
    width: 100%;
    display: flex;
    padding: 0.25rem 0;
    justify-content: flex-end;

    ${(props) =>
      props.isAway &&
      css`
        flex-direction: row-reverse;
      `};

    .goal-icon {
      text-decoration: none;

      ${(props) =>
        props.isAway
          ? css`
              margin-right: 0.25rem;
            `
          : css`
              margin-left: 0.25rem;
            `};
    }
    .scorer-name {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        text-decoration-color: ${(props) => props.teamColor};
        color: ${(props) => props.teamColor};
        cursor: pointer;
      }
    }
  }
`;

const StyledStatsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .stat-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.25rem 0;
  }
`;

function getWhoScored(players, id) {
  return players
    .filter((player) => player.goals > 0 && player.team_id === id)
    .map((player) => {
      return (
        <Link
          key={player.player_id}
          to={`players/${player.player_id}`}
          className="scorer-info">
          <span className="scorer-name">
            {player.player_known_name || player.player_name}
          </span>
          <span className="goal-icon">{'⚽️'.repeat(player.goals)}</span>
        </Link>
      );
    });
}

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

function TeamMatchInfo({
  id,
  color = '#6e6e6e',
  name = '',
  score = '?',
  penaltyScore,
  isWinner = false,
  isAway = false,
  players = [],
  teamStats = {},
}) {
  return (
    <StyledTeamMatchInfo teamColor={color} winner={isWinner} isAway={isAway}>
      <StyledTeam teamColor={color} winner={isWinner} isAway={isAway}>
        <Link to={`/teams/${id}`} className="team-name">
          {name}
        </Link>
        <div className="score">{`${score}${
          penaltyScore != null ? `(${penaltyScore})` : ''
        }`}</div>
      </StyledTeam>
      <StyledGoalScorerContainer isAway={isAway} teamColor={color}>
        {getWhoScored(players, id)}
      </StyledGoalScorerContainer>
      <StyledStatsContainer isAway={isAway}>
        {getTeamStatEls(teamStats)}
      </StyledStatsContainer>
    </StyledTeamMatchInfo>
  );
}

export default TeamMatchInfo;
