import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import useInputState from '@hooks/useInputState';
import { AuthContext } from "@contexts/AuthContext";
import { Redirect, Link } from 'react-router-dom';
import Spinner from '@components/Spinner';
import ERRORS from '@errors';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  display: ${props => props.error ? 'inline' : 'none'};
`;

const LinkToSignUp = styled(Link)`
  margin-top: 10px;
  font-size: 10px;
`;

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, onEmailChange] = useInputState(props?.location?.state?.email);
  const [password, onPasswordChange] = useInputState();

  if (auth.me) {
    return <Redirect to={{ pathname: '/home' }} />
  } else if (auth.loading) {
    return <Spinner />
  }

  return (
    <CenteredContainer>
      <Banner>Log in with your credentials!</Banner>
      <form onSubmit={e => e.preventDefault() ^ auth.logIn(email, password)}>
        <CenteredContainer>
          <Input type="text" name="email" value={email} onChange={onEmailChange} placeholder="email" />
          <Input type="password" name="password" value={password} onChange={onPasswordChange} placeholder="password" />
          <Input type="submit" value="Confirm" disabled={!(password && email)} />
          <LinkToSignUp to="/SignUp">Don't have an account? Sign up for free</LinkToSignUp>
          <ErrorMessage error={auth.error === ERRORS.INVALID_CREDENTIALS}>Oh snap, that's no good. Try again</ErrorMessage>
        </CenteredContainer>
      </form>
    </CenteredContainer >
  );
}

export default memo(Login);
