import React from 'react';
import NotFound from './NotFound';
import { render } from '@testing-library/react';

describe('NotFound', () => {
  test('Should render correctly', () => {
    const { getByText } = render(
      <NotFound />
    )
    const banner = getByText("Sorry! Couldn't found what you're looking for...");
    expect(banner).toBeInTheDocument();
  });
});
