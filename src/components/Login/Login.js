import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import useInputState from '@hooks/useInputState';
import { AuthContext } from "@contexts/AuthContext";
import { Redirect, Link } from 'react-router-dom';
import Spinner from '@components/Spinner';
import Button from '@components/Button';
import ERRORS from '@errors';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

const Banner = styled.div`
  margin-top: 10px;
  color: ${props => props.theme?.theme?.accentColor};
`;

const Input = styled.input`
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  display: ${props => props.error ? 'inline' : 'none'};
  color: ${props => props.theme?.theme?.accentColor};
`;

const LinkToSignUp = styled(Link)`
  margin-top: 10px;
  font-size: 12px;
`;

const LoginButton = styled(Button)`
  margin-top: 10px;
`;

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, onEmailChange] = useInputState(props?.location?.state?.email);
  const [password, onPasswordChange] = useInputState();

  if (auth.me) {
    return <Redirect to={{ pathname: '/recipes' }} />
  } else if (auth.loading) {
    return <Spinner />
  }

  const onSubmit = e => e.preventDefault() ^ auth.logIn(email, password);

  return (
    <CenteredContainer>
      <Banner>Log in with your credentials</Banner>
      <form>
        <CenteredContainer>
          <Input type="text" name="email" value={email} onChange={onEmailChange} placeholder="email" />
          <Input type="password" name="password" value={password} onChange={onPasswordChange} placeholder="password" />
          <LoginButton onClick={onSubmit} disabled={!(password && email)}>Confirm</LoginButton>
          <LinkToSignUp to="/signup">Don't have an account? Sign up for free</LinkToSignUp>
          <ErrorMessage data-testid="asdf" error={auth.error?.type === ERRORS.INVALID_CREDENTIALS}>Oh snap, that's no good. Try again</ErrorMessage>
        </CenteredContainer>
      </form>
    </CenteredContainer >
  );
}

export default memo(Login);
