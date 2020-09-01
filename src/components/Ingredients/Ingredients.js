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
        onCreate={home.create?.ingredient}
        onDelete={home.destroy?.ingredient}
        items={home.ingredients}
        placeholder={'eg: carrots'}
        onEdit={(ingredient, name) => home.patch?.ingredient(ingredient, { name })}
        onRefresh={home.fetch?.ingredients}
    />
}

export default Ingredients;

