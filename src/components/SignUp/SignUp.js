import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import useInputState from '@hooks/useInputState';
import * as recipes from '@services/recipes';
import { useHistory } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import { authActions } from "@reducers/auth";
import { Redirect, Link } from 'react-router-dom';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  margin: 10px;
  text-align: center;
`;

const Input = styled.input`
  margin: 5px;
`;

const LinkToLogin = styled(Link)`
  margin-top: 10px;
  font-size: 10px;
`;

const SignUp = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [name, onNameChange] = useInputState('tq');
  const [email, onEmailChange] = useInputState(`user-${Math.floor(Math.random() * 999)}@travelperk.com`);
  const [password, onPasswordChange] = useInputState('password123');

  const onSubmitForm = e => {
    e.preventDefault();
    recipes.signUp(name, email, password)
      .then(({ email }) => {
        auth.dispatch(authActions.signedUp());
        history.push({ pathname: 'login', state: { email } });
      })
      .catch(alert);
  };

  if (auth.me) {
    return <Redirect to={{ pathname: '/home' }} />
  }

  return (
    <CenteredContainer>
      <Banner>Sign up to enjoy the best recipe management app!</Banner>
      <form onSubmit={onSubmitForm}>
        <CenteredContainer>
          <Input type="text" name="name" value={name} onChange={onNameChange} placeholder="name" />
          <Input type="text" name="email" value={email} onChange={onEmailChange} placeholder="email" />
          <Input type="password" name="password" value={password} onChange={onPasswordChange} placeholder="password" />
          <Input type="submit" value="Confirm" disabled={!(name && password && email)} />
          <LinkToLogin to="/login">Have an account already? Log in.</LinkToLogin>
        </CenteredContainer>
      </form>
    </CenteredContainer>
  );
}

export default memo(SignUp);

