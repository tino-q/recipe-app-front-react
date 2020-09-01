export function authReducer(state, action) {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                token: action.token,
                me: action.me,
                loading: false,
                loginError: null,
                invalidCredentialError: null
            };
        case 'LOG_OUT':
            return {
                ...state,
                token: null,
                me: null
            };

        default:
            throw new Error(`Unknown authReducer action ${action.type}`);
    }
}

export const authActions = {
    setAuth: (token, me) => ({ type: 'SET_AUTH', token, me }),
    logOut: () => ({ type: 'LOG_OUT' }),
}
