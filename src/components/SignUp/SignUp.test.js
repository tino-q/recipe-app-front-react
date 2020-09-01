import React from 'react';
import SignUp from '@components/SignUp';
import { AuthContext, AuthProvider } from '@contexts/AuthContext';
import { cleanup, fireEvent } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { renderWithRouter, act } from '@src/setupTests';
import * as recipes from '@services/recipes';

jest.mock('@services/recipes');

describe('Signup', () => {
  afterEach(cleanup)

  test('Should render correctly', () => {
    const { container, getByText } = renderWithRouter(
      <AuthContext.Provider value={{ token: null, me: null }}>
        <SignUp />
      </AuthContext.Provider>
    )
    const emailInput = container.querySelector("input[name=email]");
    const nameInput = container.querySelector("input[name=name]");
    const passwordInput = container.querySelector("input[name=password]");
    const submitButton = container.querySelector("button[type=submit]");

    expect(getByText('Sign up to enjoy the best recipe management app!')).toBeInTheDocument();
    expect(getByText('Have an account already? Log in.')).toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(emailInput.placeholder).toEqual('email');
    expect(nameInput.placeholder).toEqual('name');
    expect(passwordInput.placeholder).toEqual('password');

    expect(submitButton).toBeInTheDocument();
    expect(submitButton.innerHTML).toEqual('Sign Up');
    expect(container.querySelector("a[href$='/login']").innerHTML).toEqual("Have an account already? Log in.");
  });

  test('Should redirect to home if me and token available', () => {
    const { history } = renderWithRouter(
      <AuthContext.Provider value={{ token: 'token', me: { name: 'name', email: 'email' } }}>
        <SignUp />
      </AuthContext.Provider>
    );

    expect(history.location.pathname).toEqual('/recipes');
  });


  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <AuthContext.Provider value={{ loading: true }}>
        <SignUp />
      </AuthContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });


  test('Should redirect to login on successful signUp', async () => {
    const { history } = await act(() => renderWithRouter(
      <AuthProvider value={{}}>
        <SignUp />
      </AuthProvider>
    ));

    const emailInput = await screen.getByPlaceholderText('email');
    const pwInput = await screen.getByPlaceholderText('password');
    const nameInput = await screen.getByPlaceholderText('name');
    const submitButton = await screen.getByText('Sign Up');

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const testName = 'some new user';
    const testEmail = 'some@email.com';
    const testPassword = 'password123';

    recipes.signUp.mockResolvedValueOnce({ email: testEmail });

    await act(async () => {
      await fireEvent.change(nameInput, { target: { value: testName } });
      await fireEvent.change(pwInput, { target: { value: testPassword } });
      await fireEvent.change(emailInput, { target: { value: testEmail } });
      await fireEvent.click(submitButton);
    });

    await waitFor(async () => {
      expect(history.location.pathname).toEqual('/login')
    })

    expect(recipes.signUp).toHaveBeenCalledWith(testName, testEmail, testPassword);
  });

})