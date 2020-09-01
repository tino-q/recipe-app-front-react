import React from 'react';
import EmojiButton from './EmojiButton';
import { act } from '@src/setupTests';
import { fireEvent, render } from '@testing-library/react';


describe('Button', () => {
  test('Should render correctly', () => {
    const EMOJI = '😋';
    const onClick = jest.fn();
    const { getByText } = render(
      <EmojiButton emoji={EMOJI} onClick={onClick} />
    )
    const button = getByText(EMOJI);
    expect(button).toBeInTheDocument();

    act(() => {
      fireEvent.click(button);
    });

    expect(onClick).toHaveBeenCalled();
  });
});
