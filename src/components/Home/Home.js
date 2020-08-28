import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '@contexts/AuthContext';
import { TABS } from '@contexts/HomeContext';
import Spinner from '@components/Spinner';
import styled from 'styled-components';

const Tabs = styled.div`
  margin-top: 10px;
  display: flex;
  width: 50%;
  justify-content: space-evenly;
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 5px;
  &:hover {
    text-decoration: underline;
  }
  &:not(:hover) {
    text-decoration: ${ ({ selected }) => selected ? 'underline' : 'none'};
  }
  border: ${ ({ selected }) => selected ? 'white' : 'transparent'} solid 2px;
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const ModuleContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;


const Home = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  if (auth.loading) {
    return <Spinner />
  }

  if (!auth.me) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  const currentTab = Object.values(TABS).find(tab => tab.path === props.match.path);
  if (!currentTab?.Component) {
    return <div>ERROR</div>
  }

  const CurrentModule = currentTab.Component;
  return (
    <Container>
      <Tabs>
        {
          Object.entries(TABS).map(([tabKey, tab]) =>
            <Tab
              onClick={() => history.push(tab.path)}
              key={tabKey}
              selected={props.match.path === tab.path}>{tab.text}
            </Tab>
          )
        }
      </Tabs>
      <ModuleContainer>
        <CurrentModule />
      </ModuleContainer>
    </Container >
  );
}

export default Home;
