import React, { useContext } from 'react';
import Spinner from '@components/Spinner';
import TextCRUD from '@components/TextCRUD';
import { HomeContext } from '@contexts/HomeContext';

const Tags = () => {
    const home = useContext(HomeContext);

    if (home.loading) {
        return <Spinner />
    }

    return <TextCRUD
        items={home.tags}
        onCreate={home.create?.tag}
        onDelete={home.destroy?.tag}
        onRefresh={home.fetch?.tags}
        onEdit={(tag, name) => home.patch.tag(tag, { name })}
        placeholder='eg: vegan'
        tag='tag'
    />
}

export default Tags;

