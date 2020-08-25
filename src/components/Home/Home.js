import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '@contexts/AuthContext';
import { TABS, HomeContext } from '@contexts/HomeContext';
import { homeActions } from '@reducers/home';
import styled from 'styled-components';

const Tabs = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  max-width: 700px;
  justify-content: space-evenly;
`;

const Tab = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:hover) {
    text-decoration: ${ ({ selected }) => selected ? 'underline' : 'none'}
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;


const ModuleContainer = styled.div`
  margin-top: 10px;
`;


const Home = () => {
  const auth = useContext(AuthContext);
  const home = useContext(HomeContext);

  if (!auth.me) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  const Module = TABS[home.selectedTab].Component;
  return (
    <Container>
      <Tabs>
        {
          Object.entries(TABS).map(([tabKey, tab]) =>
            <Tab
              onClick={() => home.dispatch(homeActions.changeTab(tabKey))}
              key={tabKey}
              selected={home.selectedTab === tabKey}>{tab.text}
            </Tab>
          )
        }
      </Tabs>
      <ModuleContainer>
        <Module />
      </ModuleContainer>
    </Container>
  );
}

export default Home;
