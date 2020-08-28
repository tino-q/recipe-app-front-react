import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { homeReducer, homeActions } from '@reducers/home';
import * as recipes from '@services/recipes';
import RecipesCRUD from '@components/RecipesCRUD';
import { AuthContext } from '@contexts/AuthContext';
import Tags from '@components/Tags';
import Ingredients from '@components/Ingredients';

export const TABS = {
    RECIPES: {
        path: '/recipes',
        text: 'Recipes',
        Component: RecipesCRUD,
    },
    INGREDIENTS: {
        path: '/ingredients',
        text: 'Ingredients',
        Component: Ingredients,
    },
    TAGS: {
        path: '/tags',
        text: 'Tags',
        Component: Tags,
    }
};

export const HomeContext = createContext();

export function HomeProvider(props) {
    const auth = useContext(AuthContext);

    const [state, dispatch] = useReducer(homeReducer, {
        loading: false,
        recipes: null,
        tags: null,
        ingredients: null,
    });

    const doWhileLoading = (promiseFn) =>
        Promise.resolve(dispatch(homeActions.setLoading(true)))
            .then(promiseFn)
            .then(() => dispatch(homeActions.setLoading(false)))
            .catch(error => dispatch(homeActions.setError(error)))

    const fetchRecipes = () => doWhileLoading(
        () => recipes.getRecipes(auth.token)
            .then(recipes => dispatch(homeActions.setRecipes(recipes)))
    );

    const fetchIngredients = () => doWhileLoading(
        () => recipes.getIngredients(auth.token)
            .then(ingredients => dispatch(homeActions.setIngredients(ingredients)))
    );

    const fetchTags = () => doWhileLoading(
        () => recipes.getTags(auth.token)
            .then(tags => dispatch(homeActions.setTags(tags)))
    );

    const createTag = (name) => doWhileLoading(
        () => recipes.createTag(auth.token, name)
            .then(tag => dispatch(homeActions.tagCreated(tag)))
    );

    const deleteTag = (tag) => doWhileLoading(
        () => recipes.deleteTag(auth.token, tag.id)
            .then(() => dispatch(homeActions.tagDeleted(tag.id)))
    );

    const createIngredient = (name) => doWhileLoading(
        () => recipes.createIngredient(auth.token, name)
            .then(ingredient => dispatch(homeActions.ingredientCreated(ingredient)))
    );

    const deleteIngredient = ingredient => doWhileLoading(
        () => recipes.deleteIngredient(auth.token, ingredient.id)
            .then(() => dispatch(homeActions.ingredientDeleted(ingredient.id)))
    );

    const editTag = (tag, newValue) => doWhileLoading(
        () => recipes.editTag(auth.token, tag.id, newValue)
            .then(updatedTag => dispatch(homeActions.tagUpdated(updatedTag)))
    );

    const fetchAll = token => doWhileLoading(
        () => Promise.all([
            recipes.getRecipes(token),
            recipes.getTags(token),
            recipes.getIngredients(token),
        ]).then(([recipes, tags, ingredients]) => {
            dispatch(homeActions.setAll(recipes, tags, ingredients));
        })
    );

    const updateTags = recipe => selectedIds =>
        doWhileLoading(() => recipes.updateTags(auth.token, recipe.id, selectedIds)
            .then(updatedRecipe => dispatch(homeActions.recipeUpdated(updatedRecipe))));

    const updateIngredients = recipe => selectedIds =>
        doWhileLoading(() => recipes.updateIngredients(auth.token, recipe.id, selectedIds)
            .then(updatedRecipe => dispatch(homeActions.recipeUpdated(updatedRecipe))));

    useEffect(() => {
        if (
            auth.token &&
            !state.loading &&
            state.recipes === null &&
            state.ingredients === null &&
            state.tags === null
        )
            fetchAll(auth.token);
    });

    return (
        <HomeContext.Provider value={{
            ...state,
            dispatch,
            fetchAll,
            fetchRecipes,
            fetchIngredients,
            fetchTags,
            createTag,
            createIngredient,
            deleteTag,
            deleteIngredient,
            editTag,
            updateTags,
            updateIngredients,
        }}>
            {props.children}
        </HomeContext.Provider>
    )
}
