import React, { createContext } from 'react';
import useToggleState from '@hooks/useToggleState'

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [loggedIn, toggleLoggedIn] = useToggleState(false);
    return (
        <AuthContext.Provider value={{ loggedIn, toggleLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}