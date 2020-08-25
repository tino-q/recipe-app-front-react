import React, { createContext, useReducer, useEffect } from 'react';
import * as recipes from '@services/recipes';
import { authReducer, authActions } from '@reducers/auth';

export const AuthContext = createContext();

const getTokenFromLocalStorage = () => {
    try {
        return window.localStorage.getItem('token');
    } catch (e) {
        return null;
    }
};


export function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, {
        token: getTokenFromLocalStorage(),
        loading: false,
    });

    const logIn = (email, password) =>
        Promise.resolve(dispatch(authActions.startLogin()))
            .then(() => recipes.logIn(email, password))
            .then(token => {
                window.localStorage.setItem('token', token);
                dispatch(authActions.setToken(token));
            })
            .catch(e => dispatch(authActions.loginError(e)));

    const logOut = () => {
        window.localStorage.removeItem('token');
        dispatch(authActions.logOut());
    }

    useEffect(() => {
        state.token && !state.me &&
            recipes.getMe(state.token)
                .then(me => dispatch(authActions.setMe(me)))
                .catch(alert);
    })

    return (
        <AuthContext.Provider value={{ ...state, logIn, logOut, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}