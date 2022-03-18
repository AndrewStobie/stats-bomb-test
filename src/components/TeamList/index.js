import React, { useState, useEffect } from 'react';
import TeamHeader from '../TeamHeader';
import styled from 'styled-components';
import { Link } from '@reach/router';

const StyledTeamContainer = styled(Link)`
  /* font-size: 1.5rem; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.toggleBorder};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.cardBackgroundColor};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.cardHoverColor};
    cursor: pointer;
  }
`;

function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('/api/get-teams')
      .then((res) => res.json())
      .then((data) => setTeams(data.teams));
  }, []);

  return (
    <>
      {teams?.length > 0
        ? teams.map((team, i) => {
            return (
              <StyledTeamContainer key={i} to={`/teams/${team.team_id}`}>
                <TeamHeader
                  id={team.team_id}
                  isNameAnchor={false}
                  name={team.team_name}
                  color={team.team_first_color}
                  record={team.record}
                />
              </StyledTeamContainer>
            );
          })
        : null}
    </>
  );
}

export default TeamList;
