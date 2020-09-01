import React, { memo, useState, useContext } from 'react';
import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { HomeContext, HomeProvider, TABS } from '@contexts/HomeContext';
import { AuthContext } from '@contexts/AuthContext';
import SignUp from '@components/SignUp';
import NotFound from '@components/NotFound';
import Login from '@components/Login';
import Home from '@components/Home';
import NavBar from '@components/NavBar';
import Profile from '@components/Profile';
import styled from 'styled-components';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import ERRORS from '@errors';
import history from './history';

const Router = styled(BrowserRouter)`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
`;

const FatalError = styled.div``;

const DEFAULT_THEME = {
  darkBlue: 'rgb(21, 36, 76)',
  lightBlue: 'rgb(81, 160, 200)',
  accentColor: 'rgb(255, 255, 207)'
};

const Contexts = memo((props) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  return (
    <ThemeProvider theme={{ theme, setTheme }}>
      <Router history={history}>
        <AuthProvider>
          <HomeProvider>
            {props.children}
          </HomeProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
});

function App() {
  const home = useContext(HomeContext);
  const auth = useContext(AuthContext);
  const error = auth.error || home.error;
  if (error?.type === ERRORS.UNKNOWN_SERVER_ERROR) {
    return <FatalError>{error?.data}</FatalError>
  }

  return (
    <div>
      <NavBar />
      <Switch>
        {
          Object.entries(TABS).map(([tabKey, { path }]) =>
            <Route
              exact
              key={path}
              path={path}
              render={() => <Home selectedTab={tabKey} />}
            />
          )
        }
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div >
  );
}


export default () => (<Contexts><App /></Contexts>);
