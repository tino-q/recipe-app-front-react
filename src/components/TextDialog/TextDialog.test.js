import React from 'react';
import TextDialog from './TextDialog';
import { act } from '@src/setupTests';
import { fireEvent, render } from '@testing-library/react';

describe('TextDialog', () => {
  test('Should render correctly', () => {
    const TEST_TEXT = 'Hello';
    const onClose = jest.fn();
    const { getByText } = render(
      <TextDialog text={TEST_TEXT} open onClose={onClose} />
    )

    const text = getByText(TEST_TEXT);
    const closeButton = getByText('close');

    expect(text).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(onClose).toHaveBeenCalled();
  });


  test('Should not render the text if not open', async () => {
    const TEST_TEXT = 'Hello';
    const { queryByText } = render(
      <TextDialog text={TEST_TEXT} open={false} />
    )
    expect(queryByText(TEST_TEXT)).toBeNull();
  });
});
