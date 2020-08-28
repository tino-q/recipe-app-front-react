import React, { memo, useState } from 'react';
import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { HomeProvider, TABS } from '@contexts/HomeContext';
import SignUp from '@components/SignUp';
import NotFound from '@components/NotFound';
import Login from '@components/Login';
import Home from '@components/Home';
import NavBar from '@components/NavBar';
import Profile from '@components/Profile';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
`;

const DEFAULT_THEME = {
  darkBlue: 'rgb(21, 36, 76)',
  lightBlue: 'rgb(81, 160, 200)',
};

const Contexts = memo((props) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  return (
    <ThemeProvider theme={{ theme, setTheme }}>
      <AuthProvider>
        <HomeProvider>
          {props.children}
        </HomeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
});


function App() {
  return (
    <AppRoot>
      <Contexts>
        <Router>
          <NavBar />
          <Switch>
            {
              Object.values(TABS).map(t => <Route key={t.path} exact path={t.path} component={Home} />)
            }
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/profile' component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Router >
      </Contexts>
    </AppRoot>
  );
}

export default App;
