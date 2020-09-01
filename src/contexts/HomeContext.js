import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { homeReducer, homeActions } from '@reducers/home';
import * as backend from '@services/recipes';
import RecipesCRUD from '@components/RecipesCRUD';
import { AuthContext } from '@contexts/AuthContext';
import Tags from '@components/Tags';
import Ingredients from '@components/Ingredients';
import useLoadingState from '@hooks/useLoadingState';


export const TABS = {
    recipes: {
        path: '/recipes',
        text: 'Recipes',
        Component: RecipesCRUD,
    },
    ingredients: {
        path: '/ingredients',
        text: 'Ingredients',
        Component: Ingredients,
    },
    tags: {
        path: '/tags',
        text: 'Tags',
        Component: Tags,
    }
};

export const HomeContext = createContext();

export function HomeProvider(props) {
    const auth = useContext(AuthContext);
    const { loading, whileLoading, error, clearError } = useLoadingState(false);
    const [state, dispatch] = useReducer(homeReducer, {
        recipes: null,
        tags: null,
        ingredients: null,
    });

    const fetch = (modelName) => () => whileLoading(
        () => backend.get(auth.token, modelName)
            .then(modelObjects => dispatch(homeActions.set(modelName, modelObjects)))
    );

    const create = modelName => modelObject => whileLoading(
        () => backend.create(auth.token, modelName, modelObject)
            .then((createdObject) => dispatch(homeActions.created(modelName, createdObject)))
    );

    const destroy = modelName => modelObject => whileLoading(
        () => backend.destroy(auth.token, modelName, modelObject.id)
            .then(() => dispatch(homeActions.deleted(modelName, modelObject.id)))
    );

    const patch = modelName => (i, params) => whileLoading(
        () => backend.patch(auth.token, modelName, i.id, params)
            .then(patched => dispatch(homeActions.patched(modelName, patched)))
    );

    useEffect(() => {
        if (
            auth.token &&
            auth.me &&
            !loading &&
            state.recipes === null &&
            state.ingredients === null &&
            state.tags === null
        ) {
            whileLoading(
                () => Promise.all([
                    backend.get(auth.token, 'recipes'),
                    backend.get(auth.token, 'tags'),
                    backend.get(auth.token, 'ingredients'),
                ]).then(([recipes, tags, ingredients]) => {
                    dispatch(homeActions.setAll(recipes, tags, ingredients));
                })
            );
        }
    }, [auth.me, auth.token, loading, state.recipes, state.ingredients, state.tags, whileLoading]);

    return (
        <HomeContext.Provider value={{
            ...state,
            loading,
            error,
            clearError,
            fetch: {
                recipes: fetch('recipes'),
                ingredients: fetch('ingredients'),
                tags: fetch('tags'),
            },

            create: {
                ingredient: name => create('ingredients')({ name }),
                tag: name => create('tags')({ name }),
                recipe: create('recipes'),
            },

            destroy: {
                ingredient: destroy('ingredients'),
                recipe: destroy('recipes'),
                tag: destroy('tags'),
            },


            patch: {
                ingredient: patch('ingredients'),
                recipe: patch('recipes'),
                tag: patch('tags'),
            }

        }}>
            {props.children}
        </HomeContext.Provider>
    )
}
