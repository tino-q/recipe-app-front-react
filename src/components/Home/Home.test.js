import React from 'react';
import Home from './Home';
import { HomeContext, TABS } from '@contexts/HomeContext';
import { AuthContext } from '@contexts/AuthContext';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '@src/setupTests';

describe('Home', () => {
  afterEach(cleanup);

  const DEFAULT_AUTH_STATE = { loading: false, token: 'token', me: { name: 'name', email: 'some@email.com' } };

  const DEFAULT_HOME_STATE = { loading: false, ingredients: [], tags: [], recipes: [] };



  test('Should render recipes correctly', () => {
    const { getByText } = renderWithRouter(
      <AuthContext.Provider value={DEFAULT_AUTH_STATE}>
        <HomeContext.Provider value={DEFAULT_HOME_STATE}>
          <Home selectedTab="recipes" />
        </HomeContext.Provider>
      </AuthContext.Provider>
    );

    expect(getByText("Refresh")).toBeInTheDocument();
    expect(getByText("Create new Recipe")).toBeInTheDocument();
    expect(Object.values(TABS).map(({ text }) => expect(getByText(text)).toBeInTheDocument()))
  });

  test('Should render tags correctly', () => {
    const { getByText } = renderWithRouter(
      <AuthContext.Provider value={DEFAULT_AUTH_STATE}>
        <HomeContext.Provider value={DEFAULT_HOME_STATE}>
          <Home selectedTab="tags" />
        </HomeContext.Provider>
      </AuthContext.Provider>
    );

    expect(getByText("Refresh")).toBeInTheDocument();
    expect(getByText("Create new tag")).toBeInTheDocument();
    expect(Object.values(TABS).map(({ text }) => expect(getByText(text)).toBeInTheDocument()))
  });

  test('Should render ingredients correctly', () => {
    const { getByText } = renderWithRouter(
      <AuthContext.Provider value={DEFAULT_AUTH_STATE}>
        <HomeContext.Provider value={DEFAULT_HOME_STATE}>
          <Home selectedTab="ingredients" />
        </HomeContext.Provider>
      </AuthContext.Provider>
    );

    expect(getByText("Refresh")).toBeInTheDocument();
    expect(getByText("Create new ingredient")).toBeInTheDocument();
    expect(Object.values(TABS).map(({ text }) => expect(getByText(text)).toBeInTheDocument()))
  });


  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <AuthContext.Provider value={{ ...DEFAULT_AUTH_STATE, loading: true }}>
        <HomeContext.Provider value={DEFAULT_HOME_STATE}>
          <Home />
        </HomeContext.Provider>
      </AuthContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('Should render spinner if home context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <AuthContext.Provider value={DEFAULT_AUTH_STATE}>
        <HomeContext.Provider value={{ ...DEFAULT_HOME_STATE, loading: true }}>
          <Home />
        </ HomeContext.Provider>
      </AuthContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});