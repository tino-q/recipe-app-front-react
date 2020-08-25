import React, { useContext, useEffect } from 'react';
import Spinner from '@components/Spinner';
import { AuthContext } from '@contexts/AuthContext';
import { HomeContext } from '@contexts/HomeContext';

const Tags = (props) => {
    const auth = useContext(AuthContext);
    const home = useContext(HomeContext);


    useEffect(() => {
        if (!home.tags) {
            home.fetchTags(auth.token);
        }
    });


    if (home.loading || !home.tags) {
        return <Spinner />
    }

    return <div {...props}> {JSON.stringify(home.tags)} </div>;
}

export default Tags;

