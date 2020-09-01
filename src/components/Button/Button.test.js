import React from 'react';
import { renderWithRouter } from '@src/setupTests';
import Button from './Button';

describe('Button', () => {
  test('Should render correctly', () => {
    const TEST_BUTTON = 'text';
    const { getByText } = renderWithRouter(
      <Button>{TEST_BUTTON}</Button>
    )
    expect(getByText(TEST_BUTTON)).toBeInTheDocument();
  });
});
