import React, { useContext } from 'react';
import Spinner from '@components/Spinner';
import TextCRUD from '@components/TextCRUD';
import { HomeContext } from '@contexts/HomeContext';

const Ingredients = () => {
    const home = useContext(HomeContext);

    if (home.loading) {
        return <Spinner />
    }

    return <TextCRUD
        tag={'ingredient'}
        onCreate={home.createIngredient}
        onDelete={home.deleteIngredient}
        items={home.ingredients}
        placeholder={'eg: carrots'}
    />
}

export default Ingredients;

