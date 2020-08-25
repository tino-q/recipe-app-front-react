import React, { useContext, useEffect } from 'react';
import Spinner from '@components/Spinner';
import { AuthContext } from '@contexts/AuthContext';
import { HomeContext } from '@contexts/HomeContext';

const Recipes = (props) => {
    const auth = useContext(AuthContext);
    const home = useContext(HomeContext);


    useEffect(() => {
        if (!home.recipes && !home.loading) {
            home.fetchRecipes(auth.token);
        }
    });


    if (home.loading || !home.recipes) {
        return <Spinner />
    }

    return <div {...props}> {JSON.stringify(home.recipes)} </div>;
}

export default Recipes;

