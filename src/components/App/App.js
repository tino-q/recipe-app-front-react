import React, { useContext } from 'react';
import Signup from '@components/Signup';
import NotFound from '@components/NotFound';
import Login from '@components/Login';
import Home from '@components/Home';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Root = styled.div`
  background: rgba(155,155,155, 0.5);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  font-size: 30px;
  margin: 10px;
`;

// import { AuthContext } from '@contexts/AuthContext';
// const { loggedIn, toggleLoggedIn } = useContext(AuthContext);

function App() {
  return (
    <Root>
      <Banner> Recipes! </Banner>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
