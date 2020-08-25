import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { homeReducer, homeActions } from '@reducers/home';
import * as recipes from '@services/recipes';
import Recipes from '@components/Recipes';
import { AuthContext } from '@contexts/AuthContext';
import Tags from '@components/Tags';
import Ingredients from '@components/Ingredients';


export const TABS = {
    RECIPES: {
        text: 'Recipes',
        Component: Recipes,
    },
    INGREDIENTS: {
        text: 'Ingredients',
        Component: Ingredients,
    },
    TAGS: {
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
        selectedTab: 'RECIPES'
    });

    const doWhileLoading = (promiseFn) =>
        Promise.resolve(dispatch(homeActions.setLoading(true)))
            .then(promiseFn)
            .then(() => dispatch(homeActions.setLoading(false)))
            .catch(error => dispatch(homeActions.setError(error)))

    const fetchRecipes = token => doWhileLoading(
        () => recipes.getRecipes(token)
            .then(recipes => dispatch(homeActions.setRecipes(recipes)))
    );

    const fetchIngredients = token => doWhileLoading(
        () => recipes.getIngredients(token)
            .then(ingredients => dispatch(homeActions.setIngredients(ingredients)))
    );

    const fetchTags = token => doWhileLoading(
        () => recipes.getTags(token)
            .then(tags => dispatch(homeActions.setTags(tags)))
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


    useEffect(() => {
        if (!state.loading && state.recipes === null && state.ingredients === null && state.tags === null)
            fetchAll(auth.token);
    })

    //const fetchRecipes = (token) => Promise.resolve(dispatch(homeActions.setLoading(true)))
    //    .then(() => recipes.getRecipes(token))
    //    .then(recipes => dispatch(homeActions.setRecipes(recipes)))
    //    .then(() => dispatch(homeActions.setLoading(false)))
    //    .catch(error => dispatch(homeActions.error(error)));
    //
    //const fetchIngredients = (token) => Promise.resolve(dispatch(homeActions.setLoading(true)))
    //    .then(() => recipes.getIngredients(token))
    //    .then(ingredients => dispatch(homeActions.setIngredients(ingredients)))
    //    .then(() => dispatch(homeActions.setLoading(false)))
    //    .catch(error => dispatch(homeActions.error(error)));
    //
    //const fetchTags = (token) => Promise.resolve(dispatch(homeActions.setLoading(true)))
    //    .then(() => recipes.getTags(token))
    //    .then(tags => dispatch(homeActions.setTags(tags)))
    //    .then(() => dispatch(homeActions.setLoading(false)))
    //    .catch(error => dispatch(homeActions.error(error)));



    return (
        <HomeContext.Provider value={{
            ...state,
            dispatch,
            fetchAll,
            fetchRecipes,
            fetchIngredients,
            fetchTags,
        }}>
            {props.children}
        </HomeContext.Provider>
    )
}
