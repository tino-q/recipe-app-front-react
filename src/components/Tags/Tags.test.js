import React from 'react';
import Tags from './Tags';
import { HomeContext } from '@contexts/HomeContext';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '@src/setupTests';

describe('Tags tab', () => {
  afterEach(cleanup)
  test('Should render correctly', () => {
    const TEST_ITEMS = [{ id: 1, name: 'vegan' }, { id: 2, name: 'organic' }]
    const { getByText } = renderWithRouter(
      <HomeContext.Provider value={{ loading: false, tags: TEST_ITEMS }}>
        <Tags />
      </HomeContext.Provider>
    )

    TEST_ITEMS.map(({ name }) =>
      expect(getByText(name)).toBeInTheDocument());
  });


  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <HomeContext.Provider value={{ loading: true }}>
        <Tags />
      </HomeContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});