import React from 'react';
import Ingredients from './Ingredients';
import { HomeContext } from '@contexts/HomeContext';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '@src/setupTests';


describe('Ingredients tab', () => {
  afterEach(cleanup)
  test('Should render correctly', () => {
    const TEST_ITEMS = [{ id: 1, name: 'apple' }, { id: 2, name: 'bananas' }]
    const { container, getByText } = renderWithRouter(
      <HomeContext.Provider value={{ loading: false, ingredients: TEST_ITEMS }}>
        <Ingredients />
      </HomeContext.Provider>
    )

    TEST_ITEMS.map(({ name }) =>
      expect(getByText(name)).toBeInTheDocument());
  });


  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <HomeContext.Provider value={{ loading: true }}>
        <Ingredients />
      </HomeContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});