import React, { useContext, useEffect } from 'react';
import Spinner from '@components/Spinner';
import { AuthContext } from '@contexts/AuthContext';
import { HomeContext } from '@contexts/HomeContext';

const Ingredients = (props) => {
    const auth = useContext(AuthContext);
    const home = useContext(HomeContext);


    useEffect(() => {
        if (!home.ingredients) {
            home.fetchIngredients(auth.token);
        }
    });


    if (home.loading || !home.ingredients) {
        return <Spinner />
    }

    return <div {...props}> {JSON.stringify(home.ingredients)} </div>;
}

export default Ingredients;

