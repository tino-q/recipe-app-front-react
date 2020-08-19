import React, { memo, useState } from 'react';
import styled from 'styled-components';
import useInputState from '@hooks/useInputState';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  margin: 10px;
`;

const Input = styled.input`
  margin: 5px;
`;

const Border = styled.div`
  border: 2px solid black;
  border-radius: 10px 10px;
`;



const Signup = () => {
  const [name, onNameChange] = useInputState();
  const [email, onEmailChange] = useInputState();
  const [password, onPasswordChange] = useInputState();


  const onSubmitForm = e => {
    console.log('submit form', name, email, password);
    e.preventDefault();
  };

  return (
    <Border>
      <CenteredContainer>
        <Banner> Sign up to enjoy the best recipe management app! </Banner>
        <form onSubmit={onSubmitForm}>
          <CenteredContainer>
            <Input type="text" name="name" value={name} onChange={onNameChange} placeholder="name" />
            <Input type="text" name="email" value={email} onChange={onEmailChange} placeholder="email" />
            <Input type="text" name="password" value={password} onChange={onPasswordChange} placeholder="password" />
            <Input type="submit" value="Confirm" />
          </CenteredContainer>
        </form>
      </CenteredContainer>
    </Border>
  );
}

export default memo(Signup);

