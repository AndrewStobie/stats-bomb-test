import React, { useState, useEffect } from 'react';
import Team from '../TeamHeader';
import styled from 'styled-components';
import { Link } from '@reach/router';

const StyledMatchContainer = styled(Link)`
  /* font-size: 1.5rem; */
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.toggleBorder};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.cardBackgroundColor};

  &:hover {
    background: ${({ theme }) => theme.colors.cardHoverColor};
    cursor: pointer;
  }
`;

function MatchList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/api/get-matches-report')
      .then((res) => res.json())
      .then((data) => setMatches(data.matches));
  }, []);

  function getWinner(match) {
    const {
      match_home_score,
      match_away_score,
      match_away_penalty_score,
      match_home_penalty_score,
    } = match;
    if (match_home_score > match_away_score) {
      return -1;
    }
    if (match_away_score > match_home_score) {
      return 1;
    }
    if (match_away_score === match_home_score) {
      if (match_home_penalty_score > match_away_penalty_score) {
        return -1;
      }
      if (match_away_penalty_score > match_home_penalty_score) {
        return 1;
      }
      if (
        (match_home_penalty_score == null &&
          match_away_penalty_score == null) ||
        match_home_penalty_score === match_away_penalty_score
      ) {
        return 0; //return draw
      }
    }
    return 0; // shouldn't happen
  }

  return (
    <>
      {matches?.length > 0
        ? matches.map((match, i) => {
            const winner = getWinner(match);
            return (
              <StyledMatchContainer
                key={i}
                className="match-container"
                to={`/matches/${match.match_id}`}>
                <Team
                  id={match.match_home_team_id}
                  name={match.home_team_name}
                  color={match.home_team_first_color}
                  score={match.match_home_score}
                  penaltyScore={match.match_home_penalty_score}
                  isWinner={winner <= 0}
                />
                <Team
                  id={match.match_away_team_id}
                  name={match.away_team_name}
                  color={match.away_team_first_color}
                  score={match.match_away_score}
                  penaltyScore={match.match_away_penalty_score}
                  isWinner={winner >= 0}
                />
              </StyledMatchContainer>
            );
          })
        : null}
    </>
  );
}

export default MatchList;
