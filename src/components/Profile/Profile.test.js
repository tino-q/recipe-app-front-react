import React from 'react';
import Profile from './Profile';
import { AuthContext } from '@contexts/AuthContext';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '@src/setupTests';


describe('Ingredients tab', () => {
  afterEach(cleanup)
  const AUTH_STATE = {
    loading: false,
    token: 'someToken',
    me: {
      name: 'some name',
      email: 'some@email.com'
    }
  };

  test('Should render correctly', () => {
    const { container, getByText } = renderWithRouter(
      <AuthContext.Provider value={AUTH_STATE}>
        <Profile />
      </AuthContext.Provider>
    )
    expect(getByText(AUTH_STATE.me.name)).toBeInTheDocument();
    expect(getByText(AUTH_STATE.me.email)).toBeInTheDocument();
  });


  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <AuthContext.Provider value={{ loading: true }}>
        <Profile />
      </AuthContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});