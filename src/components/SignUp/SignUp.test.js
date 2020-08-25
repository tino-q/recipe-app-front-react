import React from 'react';
import SignUp from '@components/SignUp';
import { AuthContext, AuthProvider } from '@contexts/AuthContext';
import { cleanup, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { renderWithRouter } from '@src/setupTests';
import * as recipes from '@services/recipes';

jest.mock('@services/recipes');

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
  const submitButton = container.querySelector("input[type=submit]");

  expect(getByText('Sign up to enjoy the best recipe management app!')).toBeInTheDocument();

  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  expect(emailInput.placeholder).toEqual('email');
  expect(nameInput.placeholder).toEqual('name');
  expect(passwordInput.placeholder).toEqual('password');

  expect(submitButton).toBeInTheDocument();
  expect(submitButton.value).toEqual('Confirm');
  expect(container.querySelector("a[href$='/login']").innerHTML).toEqual("Have an account already? Log in.");
});

test('Should redirect to home if me and token available', () => {
  const { history } = renderWithRouter(
    <AuthContext.Provider value={{ token: 'token', me: { name: 'name', email: 'email' } }}>
      <SignUp />
    </AuthContext.Provider>
  );

  expect(history.location.pathname).toEqual('/home');
});





// const { container } = utils;
/// const emailInput = container.querySelector('input[name=email]');
/// const nameInput = container.querySelector("input[name=name]");
/// const passwordInput = container.querySelector("input[name=password]");
/// const submitButton = container.querySelector("input[type=submit]");


test.only('Should redirect to login on successfull signUp', async () => {
  const email = 'some@email.com';
  recipes.signUp.mockResolvedValueOnce({ email });

  act(() => {
    renderWithRouter(
      <AuthProvider value={{}}>
        <SignUp />
      </AuthProvider>
    );
  });

  const emailInput = screen.getByPlaceholderText('email');
  const pwInput = screen.getByPlaceholderText('password');
  const nameInput = screen.getByPlaceholderText('name');
  const submitButton = screen.getByDisplayValue("Confirm");

  expect(submitButton).toBeDefined();



  act(() => {
    fireEvent.change(nameInput, { target: { value: 'some new user' } });
    fireEvent.change(pwInput, { target: { value: 'password123' } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.submit(submitButton);
  });


  screen.debug();
});
