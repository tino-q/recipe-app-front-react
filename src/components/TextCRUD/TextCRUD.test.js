import React from 'react';
import TextCRUD from './TextCRUD';
import { act } from '@src/setupTests';
import { fireEvent, render } from '@testing-library/react';


describe('TextCRUD', () => {
  const TEST_TAG = 'fruits';
  const TEST_PLACEHOLDER = 'apple';
  const TEST_ITEMS = [{ id: 1, name: 'first' }, { id: 2, name: 'second' }];

  test('Should render correctly', () => {

    const { getByText, queryByPlaceholderText } = render(
      <TextCRUD
        tag={TEST_TAG}
        items={TEST_ITEMS}
        placeholder={TEST_PLACEHOLDER}
      />
    )
    expect(getByText(`Create new ${TEST_TAG}`)).toBeInTheDocument();

    TEST_ITEMS.map(({ name }) =>
      expect(getByText(name)).toBeInTheDocument());

    expect(queryByPlaceholderText(TEST_PLACEHOLDER)).toBeNull();
  });


  test('Should display editor if creating item', async () => {
    const TEST_CREATE_VALUE = 'some new value';
    const onCreate = jest.fn();
    const { getByText, queryByPlaceholderText, getByLabelText } = render(
      <TextCRUD
        tag={TEST_TAG}
        items={TEST_ITEMS}
        placeholder={TEST_PLACEHOLDER}
        onCreate={onCreate} />
    )
    TEST_ITEMS.map(({ name }) =>
      expect(getByText(name)).toBeInTheDocument());

    const createButton = getByText(`Create new ${TEST_TAG}`);
    expect(createButton).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(createButton);
    });

    const input = queryByPlaceholderText(TEST_PLACEHOLDER);
    expect(input).toBeInTheDocument();


    const confirmButton = getByLabelText('OK');
    expect(confirmButton).toBeInTheDocument();


    await act(async () => {
      await fireEvent.change(input, { target: { value: TEST_CREATE_VALUE } });
      await fireEvent.click(confirmButton);
    })

    expect(onCreate).toHaveBeenCalledWith(TEST_CREATE_VALUE);
  });


  test('Should close editor on cancel', async () => {
    const { getByText, queryByPlaceholderText, getByLabelText } = render(
      <TextCRUD
        tag={TEST_TAG}
        items={TEST_ITEMS}
        placeholder={TEST_PLACEHOLDER} />
    )
    TEST_ITEMS.map(({ name }) =>
      expect(getByText(name)).toBeInTheDocument());

    const createButton = getByText(`Create new ${TEST_TAG}`);
    expect(createButton).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(createButton);
    });

    const input = queryByPlaceholderText(TEST_PLACEHOLDER);
    expect(input).toBeInTheDocument();


    const cancelButton = getByLabelText('Cancel');
    expect(cancelButton).toBeInTheDocument();


    await act(async () => {
      await fireEvent.click(cancelButton);
    })

    expect(queryByPlaceholderText(TEST_PLACEHOLDER)).toBeNull();
  });



  test('Should call on refresh', async () => {
    const onRefresh = jest.fn();
    const { getByText } = render(
      <TextCRUD
        tag={TEST_TAG}
        items={TEST_ITEMS}
        placeholder={TEST_PLACEHOLDER}
        onRefresh={onRefresh} />
    )
    TEST_ITEMS.map(({ name }) =>
      expect(getByText(name)).toBeInTheDocument());

    const refreshButton = getByText('Refresh');
    expect(refreshButton).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(refreshButton);
    });

    expect(onRefresh).toHaveBeenCalled();
  });

});
