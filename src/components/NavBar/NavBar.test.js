import React from 'react';
import NavBar from './NavBar';
import { AuthContext } from '@contexts/AuthContext';
import { render } from '@testing-library/react';


describe('NavBar', () => {
  const AUTH_STATE = {
    loading: false,
    token: 'someToken',
    me: {
      name: 'some name',
      email: 'some@email.com'
    }
  };

  test('Should render correctly without credentials', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{}}>
        <NavBar />
      </AuthContext.Provider>
    )

    expect(getByText("Recipes!")).toBeInTheDocument();
  });

  test('Should render correctly with credentials', () => {
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={AUTH_STATE}>
        <NavBar />
      </AuthContext.Provider>
    )

    expect(getByText("Recipes!")).toBeInTheDocument();
    expect(getByText(`Hello, ${AUTH_STATE.me.name}!`)).toBeInTheDocument();
    expect(getByTestId('navbar-profile-icon')).toBeInTheDocument();
  });
});
