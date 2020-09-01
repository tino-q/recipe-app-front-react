import React from 'react';
import Login from '@components/Login';
import { AuthContext, AuthProvider } from '@contexts/AuthContext';
import { cleanup, fireEvent } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { renderWithRouter, act } from '@src/setupTests';
import * as recipes from '@services/recipes';
import ERRORS from '@errors';

jest.mock('@services/recipes');

describe('LogIn', () => {
  afterEach(cleanup);

  test('Should render correctly', () => {
    const { container, getByText } = renderWithRouter(
      <AuthContext.Provider value={{}}>
        <Login />
      </AuthContext.Provider>
    )
    const emailInput = container.querySelector("input[name=email]");
    const passwordInput = container.querySelector("input[name=password]");
    const submitButton = getByText("Confirm");

    expect(getByText("Don't have an account? Sign up for free")).toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(emailInput.placeholder).toEqual('email');
    expect(passwordInput.placeholder).toEqual('password');

    expect(submitButton).toBeInTheDocument();
    expect(container.querySelector("a[href$='/signup']").innerHTML).toEqual("Don't have an account? Sign up for free");
  });

  test('Should redirect to home if me and token available', () => {
    const { history } = renderWithRouter(
      <AuthContext.Provider value={{ token: 'token', me: { name: 'name', email: 'email' } }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(history.location.pathname).toEqual('/recipes');
  });

  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <AuthContext.Provider value={{ loading: true }}>
        <Login />
      </AuthContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('Should fetch me and redirect to recipes after successful login', async () => {
    const { history } = await act(() => renderWithRouter(
      <AuthProvider>
        <Login />
      </AuthProvider>
    ));

    const emailInput = await screen.getByPlaceholderText('email');
    const pwInput = await screen.getByPlaceholderText('password');
    const submitButton = await screen.getByText('Confirm');

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const testName = 'some new user';
    const testEmail = 'some@email.com';
    const testPassword = 'testPassword';
    const testToken = 'someToken';

    recipes.logIn.mockResolvedValueOnce(testToken);
    recipes.getMe.mockResolvedValueOnce({ name: testName, email: testEmail });

    await act(async () => {
      await fireEvent.change(pwInput, { target: { value: testPassword } });
      await fireEvent.change(emailInput, { target: { value: testEmail } });
      await fireEvent.click(submitButton);
    });

    await waitFor(async () => {
      expect(history.location.pathname).toEqual('/recipes')
    })

    expect(recipes.logIn).toHaveBeenCalledWith(testEmail, testPassword);
    expect(recipes.getMe).toHaveBeenCalledWith(testToken);
  });

  test('Should show error message when logging in with invalid credentials', async () => {
    const { getByText } = await act(() => renderWithRouter(
      <AuthProvider>
        <Login />
      </AuthProvider>
    ));

    const ERROR_MESSAGE = "Oh snap, that's no good. Try again";
    expect(getByText(ERROR_MESSAGE)).toHaveStyle('display: none;')
    const emailInput = await screen.getByPlaceholderText('email');
    const pwInput = await screen.getByPlaceholderText('password');
    const submitButton = await screen.getByText('Confirm');

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const testEmail = 'some@email.com';
    const testPassword = 'testPassword';

    recipes.logIn.mockRejectedValueOnce({ type: ERRORS.INVALID_CREDENTIALS })

    await act(async () => {
      await fireEvent.change(pwInput, { target: { value: testPassword } });
      await fireEvent.change(emailInput, { target: { value: testEmail } });
      await fireEvent.click(submitButton);
    });
    expect(getByText(ERROR_MESSAGE)).toHaveStyle('display: inline;');
    expect(recipes.logIn).toHaveBeenCalledWith(testEmail, testPassword);
  });
});
