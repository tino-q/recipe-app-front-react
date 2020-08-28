import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '@contexts/AuthContext';
import TextEditor from '@components/TextCRUD/TextEditor';
import Spinner from '@components/Spinner';
import Emoji from '@components/Emoji';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  min-height: 45px;
  flex-wrap: wrap;
  width: 40%;
`;

const Text = styled.div`
`;

const EditableValueContainer = styled.div`
  display: flex;
  align-items: center;
`;


const LinkToHome = styled(Link)`
  margin-top: 10px;
  font-size: 20px;
`;

const EditButton = styled(Emoji)`
  margin-left: 5px;
`;


const Row = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <RowContainer>
      <div>{props.header}</div>
      {
        !isEditing ?
          <EditableValueContainer>
            <Text onDoubleClick={() => setIsEditing(true)}>
              {props.value}
            </Text>
            <EditButton
              onClick={() => setIsEditing(true)}
              label='edit'
              emoji="📝" />
          </EditableValueContainer> :
          <TextEditor
            onCancel={() => setIsEditing(!isEditing)}
            value={props.value}
            password={props.password}
            onSubmit={newName => {
              props.onSubmit(newName);
              setIsEditing(false);
            }}
          />
      }
    </RowContainer>
  );
};



const Profile = (props) => {
  const auth = useContext(AuthContext);

  if (auth.loading) {
    return <Spinner />
  }

  if (!auth.me) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <ProfileContainer>
      <Row
        header="Name"
        value={auth.me.name}
        onSubmit={auth.changeName}
      />
      <Row
        header="Email"
        value={auth.me.email}
        onSubmit={auth.changeEmail}
      />
      <Row
        header="Password"
        onSubmit={auth.changePassword}
        password
      />
      <LinkToHome to="/">Back to Recipes</LinkToHome>
    </ProfileContainer>
  );
}

export default Profile;
