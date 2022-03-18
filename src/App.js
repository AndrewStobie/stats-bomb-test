import React, { useState } from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import Header from './components/Header';
import Home from './components/Home';
import Matches from './components/Matches';
import MatchList from './components/MatchList';
import MatchSummary from './components/MatchSummary';
import Teams from './components/Teams';
import TeamList from './components/TeamList';
import TeamSummary from './components/TeamSummary';
import styled from 'styled-components';

const StyledRouter = styled(Router)`
  flex: 1;
  dislay: contents;
`;

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <StyledRouter primary={false}>
            <Home path="/" />
            <Matches path="matches">
              <MatchList path="/" />
              <MatchSummary path=":matchId" />
            </Matches>
            <Teams path="teams">
              <TeamList path="/" />
              <TeamSummary path=":teamId" />
            </Teams>
          </StyledRouter>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
