import React, { memo, useState } from 'react';
import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { HomeProvider } from '@contexts/HomeContext';
import SignUp from '@components/SignUp';
import NotFound from '@components/NotFound';
import Login from '@components/Login';
import Home from '@components/Home';
import NavBar from '@components/NavBar';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
`;

const Border = styled.div`
  border-top: 2px solid black;
`;


const DEFAULT_THEME = {
  dark: false
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
        <NavBar />
        <Border>
          <Router>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/SignUp' component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </Router >
        </Border>
      </Contexts>
    </AppRoot>
  );
}

export default App;
