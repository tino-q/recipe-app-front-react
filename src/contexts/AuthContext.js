import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// import { authReducer, authActions } from '@reducers/auth';
import * as backend from '@services/recipes';
import useLoadingState from '@hooks/useLoadingState';
// import history from '@components/App/history';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const history = useHistory();
    const [state, setState] = useState({
        token: window.localStorage.getItem('token'),
        me: null,
    });


    const { loading, whileLoading, error, clearError } = useLoadingState(false);

    const logIn = (email, password) => {
        whileLoading(async () => {
            const token = await backend.logIn(email, password);
            const me = await backend.getMe(token);
            window.localStorage.setItem('token', token);
            setState({ token, me });
        })
    };

    const patchMeField = field => value => whileLoading(async () => {
        const me = await backend.patchMe(state.token, { [field]: value });
        setState({ ...state, me });
    });

    const logOut = () => whileLoading(() => {
        window.localStorage.removeItem('token');
        setState({});
    });

    const signUp = (name, email, password) => whileLoading(
        async () => backend.signUp(name, email, password)
            .then(() => history.push({ pathname: '/login', state: { email } }))
    );


    useEffect(() => {
        if (!error && state.token && !state.me && !loading) {
            whileLoading(async () => {
                const { name, email } = await backend.getMe(state.token);
                setState({ ...state, me: { name, email } });
            });
        }
    }, [error, state.token, state.me, loading, whileLoading])

    return (
        <AuthContext.Provider value={{
            ...state,
            loading,
            error,
            logIn,
            logOut,
            signUp,
            changeName: patchMeField('name'),
            changeEmail: patchMeField('email'),
            changePassword: patchMeField('password'),
            clearError
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}