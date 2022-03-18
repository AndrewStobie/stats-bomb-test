import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TeamInfo from '../TeamInfo';
import PlayerTable from '../PlayerTable';

const StyledTeamSummaryContainer = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-decoration: none;

  margin: 0;
  min-width: 0;

  font-size: 1rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }

  > div {
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.toggleBorder};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.cardBackgroundColor};
  }
`;

function getColumns(info) {
  // columns proved easier to hard code would make dynamic in the future
  return [
    {
      Header: `${info.team_name} Player Stats`,
      columns: [
        {
          Header: 'Player Name',
          accessor: 'player_name',
        },
        {
          Header: 'Passes',
          accessor: 'passes',
        },
        {
          Header: 'Shots',
          accessor: 'shots',
        },
        {
          Header: 'Goals',
          accessor: 'goals',
        },
        {
          Header: 'xG',
          accessor: 'xg',
        },
        {
          Header: 'Pressures',
          accessor: 'pressures',
        },
        {
          Header: 'Completed Passes',
          accessor: 'completed_passes',
        },
        {
          Header: 'Interceptions',
          accessor: 'interceptions',
        },
        {
          Header: 'Tackles',
          accessor: 'tackles',
        },
      ],
    },
  ];
}

function TeamSummary({ teamId }) {
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    fetch(`/api/get-full-team-info?teamId=${teamId}`)
      .then((res) => res.json())
      .then((data) => setTeamInfo(data));
  }, [teamId]);

  return (
    <StyledTeamSummaryContainer>
      {teamInfo != null ? (
        <>
          <TeamInfo
            id={teamInfo.team_id}
            color={teamInfo.team_first_color}
            name={teamInfo.team_name}
            teamStats={teamInfo.teamStats}
            players={teamInfo.players}
          />
          <PlayerTable columns={getColumns(teamInfo)} data={teamInfo.players} />
        </>
      ) : (
        <></>
      )}
    </StyledTeamSummaryContainer>
  );
}

export default TeamSummary;
