import React from 'react';
import Spinner from './Spinner';
import { screen, waitFor } from '@testing-library/dom';
import { renderWithRouter, act } from '@src/setupTests';
import { cleanup, fireEvent, render } from '@testing-library/react';

describe('Spinner', () => {
  test('Should render correctly', () => {
    const { getByTestId } = render(
      <Spinner />
    );
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
