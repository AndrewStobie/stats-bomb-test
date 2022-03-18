import React, { useState, useEffect } from 'react';
import TeamMatchInfo from '../TeamMatchInfo';
import styled from 'styled-components';

const StyledMatchSummaryContainer = styled.div`
  display: grid;
  /* font-size: 1.5rem; */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(0px, max-content) minmax(0px, max-content) minmax(
      0px,
      max-content
    );
  grid-auto-flow: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.toggleBorder};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.cardBackgroundColor};
`;

function MatchSummary({ matchId }) {
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    fetch(`/api/get-full-match-info?matchId=${matchId}`)
      .then((res) => res.json())
      .then((data) => setMatchInfo(data));
  }, [matchId]);

  function getWinner(match) {
    const {
      match_home_score,
      match_away_score,
      match_away_penalty_score,
      match_home_penalty_score,
    } = match || {};
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

  const winner = getWinner(matchInfo);
  return (
    <StyledMatchSummaryContainer>
      {matchInfo != null ? (
        <>
          <TeamMatchInfo
            id={matchInfo.match_home_team_id}
            name={matchInfo.home_team_name}
            color={matchInfo.home_team_first_color}
            score={matchInfo.match_home_score}
            penaltyScore={matchInfo.match_home_penalty_score}
            isWinner={winner <= 0}
            players={matchInfo.players}
            teamStats={matchInfo.home_stats}
            isAway={false}
          />
          <TeamMatchInfo
            id={matchInfo.match_away_team_id}
            name={matchInfo.away_team_name}
            color={matchInfo.away_team_first_color}
            score={matchInfo.match_away_score}
            penaltyScore={matchInfo.match_away_penalty_score}
            isWinner={winner >= 0}
            players={matchInfo.players}
            teamStats={matchInfo.away_stats}
            isAway={true}
          />
        </>
      ) : (
        <>
          <TeamMatchInfo />
          <TeamMatchInfo />
        </>
      )}
    </StyledMatchSummaryContainer>
  );
}

export default MatchSummary;
