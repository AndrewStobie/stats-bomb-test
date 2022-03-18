import React from 'react';
import Nav from '../Nav';
import ThemeToggle from '../ThemeToggle';
import styled from 'styled-components';
import logo from '../../assets/images/statsbomb-social.png';
import { Link } from '@reach/router';

const StyledHeader = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  padding: 0 12px;

  img {
    width: 10vh;
  }
`;

function Header({ theme, toggleTheme }) {
  return (
    <StyledHeader>
      <Link to={'/'}>
        <img src={logo} className="App-logo" alt="Stats Bomb Logo" />
      </Link>
      <Nav />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </StyledHeader>
  );
}

export default Header;
