import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import useInputState from '@hooks/useInputState';
import TextDialog from "@components/TextDialog";
import Button from "@components/Button";
import { AuthContext } from "@contexts/AuthContext";
import { Redirect, Link } from 'react-router-dom';
import Spinner from '@components/Spinner';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  margin: 10px;
  text-align: center;
  color: ${props => props.theme?.theme?.accentColor};
`;

const Input = styled.input`
  margin: 5px;
`;

const LinkToLogin = styled(Link)`
  margin-top: 10px;
  font-size: 12px;
`;

const SignUpButton = styled(Button)`
  margin-top: 10px;
`;

const SignUp = () => {
  const auth = useContext(AuthContext);
  const [name, onNameChange] = useInputState('');
  const [email, onEmailChange] = useInputState('');
  const [password, onPasswordChange] = useInputState('');

  const onSubmit = e => e.preventDefault() ^ auth.signUp(name, email, password);

  if (auth.me) {
    return <Redirect to={{ pathname: '/recipes' }} />
  } else if (auth.loading) {
    return <Spinner />
  }

  return (
    <CenteredContainer>
      {
        auth.error && <TextDialog
          open={Boolean(auth.error)}
          onClose={auth.clearError}
          text={auth.error?.displayText}
        />
      }
      <Banner>Sign up to enjoy the best recipe management app!</Banner>
      <form onSubmit={onSubmit}>
        <CenteredContainer>
          <Input type="text" name="name" value={name} onChange={onNameChange} placeholder="name" />
          <Input type="text" name="email" value={email} onChange={onEmailChange} placeholder="email" />
          <Input type="password" name="password" value={password} onChange={onPasswordChange} placeholder="password" />
          <SignUpButton data-testid="signup-button" onClick={onSubmit} type="submit" disabled={!(name && password && email)}>Sign Up</SignUpButton>
          <LinkToLogin to="/login">Have an account already? Log in.</LinkToLogin>
        </CenteredContainer>
      </form>
    </CenteredContainer >
  );
}

export default memo(SignUp);

