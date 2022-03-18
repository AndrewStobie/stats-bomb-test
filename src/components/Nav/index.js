import React from 'react';
import { Link } from '@reach/router';
import styled, { withTheme } from 'styled-components';

const StyledNav = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    margin: 0 1rem;
    color: ${({ theme }) => theme.colors.accentColor};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const NavLink = withTheme((props) => {
  console.log(props);
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent
              ? props.theme.colors.secondaryColor
              : props.theme.colors.accentColor,
            textDecoration: isCurrent ? 'underline' : 'none',
          },
        };
      }}
    />
  );
});

function Nav({ theme }) {
  return (
    <StyledNav>
      <NavLink to="/matches">Matches</NavLink>
      <NavLink to="/teams">Teams</NavLink>
    </StyledNav>
  );
}

export default Nav;
