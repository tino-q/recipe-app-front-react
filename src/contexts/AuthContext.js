import React, { createContext, useReducer, useEffect } from 'react';
import * as recipes from '@services/recipes';
import { authReducer, authActions } from '@reducers/auth';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const token = window.localStorage.getItem('token');
    const [state, dispatch] = useReducer(authReducer, {
        token,
        me: null,
        error: null,
        loading: Boolean(token),
    });

    const refreshAuth = token => recipes.getMe(token)
        .then(me => dispatch(authActions.setAuth(token, me)))
        .then(() => dispatch(authActions.setLoading(false)))
        .catch(e => dispatch(authActions.loginError(e)))

    const logIn = (email, password) => {
        dispatch(authActions.setLoading(true));
        recipes.logIn(email, password)
            .then(token => {
                window.localStorage.setItem('token', token);
                return token;
            })
            .then(refreshAuth);
    };

    const changeName = newName => {
        dispatch(authActions.setLoading(true));
        recipes.changeName(token, newName)
            .then(me => dispatch(authActions.setAuth(token, me)))
            .then(() => dispatch(authActions.setLoading(false)));
    }

    const changeEmail = newEmail => {
        dispatch(authActions.setLoading(true));
        recipes.changeEmail(token, newEmail)
            .then(me => dispatch(authActions.setAuth(token, me)))
            .then(() => dispatch(authActions.setLoading(false)));
    }

    const changePassword = newPassword => {
        dispatch(authActions.setLoading(true));
        recipes.changePassword(token, newPassword)
            .then(me => dispatch(authActions.setAuth(token, me)))
            .then(() => dispatch(authActions.setLoading(false)));
    }

    useEffect(() => {
        if (!state.me && state.token) {
            refreshAuth(state.token)
        }
    })

    const logOut = () => {
        window.localStorage.removeItem('token');
        dispatch(authActions.logOut());
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            logIn,
            logOut,
            dispatch,
            changeName,
            changeEmail,
            changePassword
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}