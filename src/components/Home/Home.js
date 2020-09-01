import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '@contexts/AuthContext';
import { HomeContext } from '@contexts/HomeContext';
import { TABS } from '@contexts/HomeContext';
import Spinner from '@components/Spinner';
import TextDialog from '@components/TextDialog';
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
  color:  ${ ({ theme }) => theme?.theme?.accentColor};
  border: ${ ({ selected, theme }) => selected ? theme?.theme?.accentColor : 'transparent'} solid 2px;
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

const Home = ({ selectedTab }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const home = useContext(HomeContext);

  if (auth.loading || home.loading) {
    return <Spinner />
  }

  if (!auth.me) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  const Module = TABS[selectedTab].Component;

  return (
    <Container>
      {
        home.error && <TextDialog
          open={Boolean(home.error)}
          onClose={home.clearError}
          text={home.error?.displayText || home.error}
        />
      }
      <Tabs>
        {
          Object.entries(TABS).map(([tabKey, tab]) =>
            <Tab
              key={tabKey}
              onClick={() => history.push(tab.path)}
              selected={tabKey === selectedTab}>{tab.text}
            </Tab>
          )
        }
      </Tabs>
      <ModuleContainer>
        <Module />
      </ModuleContainer>
    </Container >
  );
}

export default Home;
