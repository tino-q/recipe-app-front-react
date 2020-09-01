import React from 'react';
import RecipesCRUD from '@components/RecipesCRUD';
import { HomeContext } from '@contexts/HomeContext';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter, act } from '@src/setupTests';

jest.mock('@services/recipes');

describe('RecipesCRUD', () => {
  afterEach(cleanup)

  const TEST_TAGS = [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }];

  const TEST_INGREDIENTS = [{ id: 1, name: 'ing1' }, { id: 2, name: 'ing2' }];

  const TEST_RECIPES = [
    { id: 1, title: 'title', price: 1.50, time_minutes: 10, ingredients: [1], tags: [2, 1] },
    { id: 2, title: 'title', price: 1.50, time_minutes: 10, ingredients: [2], tags: [1] },
  ]

  test('Should render correctly', () => {

    const HOME_STATE = {
      loading: false,
      recipes: TEST_RECIPES,
      ingredients: TEST_INGREDIENTS,
      tags: TEST_TAGS,
      fetch: {
        recipes: jest.fn(),
      },
      create: {
        recipe: jest.fn(),
      }
    };

    const { getByText, getAllByText } = renderWithRouter(
      <HomeContext.Provider value={HOME_STATE}>
        <RecipesCRUD />
      </HomeContext.Provider>
    );

    expect(getByText("Create new Recipe")).toBeInTheDocument();

    const refreshButton = getByText("Refresh");
    expect(refreshButton).toBeInTheDocument();


    act(() => {
      fireEvent.click(refreshButton);
    });

    expect(HOME_STATE.fetch.recipes).toHaveBeenCalled();

    HOME_STATE.recipes.map(({ ingredients, tags }) => {
      ingredients.map(i => TEST_INGREDIENTS.find(({ id }) => id === i))
        .map(ing => expect(getByText(ing.name)).toBeInTheDocument())
      tags.map(i => TEST_TAGS.find(({ id }) => id === i))
        .map(tag => getAllByText(tag.name).map(elem => expect(elem).toBeInTheDocument()))
    });

  });

  test('Should render spinner if auth context is loading', () => {
    const { getByTestId } = renderWithRouter(
      <HomeContext.Provider value={{ loading: true }}>
        <RecipesCRUD />
      </HomeContext.Provider>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });



  test('Should render correctly', async () => {

    const HOME_STATE = {
      loading: false,
      recipes: TEST_RECIPES,
      ingredients: TEST_INGREDIENTS,
      tags: TEST_TAGS,
      fetch: {
        recipes: jest.fn(),
      },
      create: {
        recipe: jest.fn(),
      }
    };

    const { getByText, getByLabelText } = renderWithRouter(
      <HomeContext.Provider value={HOME_STATE}>
        <RecipesCRUD />
      </HomeContext.Provider>
    );

    expect(getByText("Create new Recipe")).toBeInTheDocument();

    const toggleEditModeButton = getByText("Create new Recipe");
    expect(toggleEditModeButton).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(toggleEditModeButton);
    });

    const createButton = getByLabelText("Create");
    expect(createButton).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(createButton);
    });

    expect(HOME_STATE.create.recipe).toHaveBeenCalled();
  });
});
