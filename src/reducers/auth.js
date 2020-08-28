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
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading
            };
        case 'LOG_OUT':
            return {
                ...state,
                token: null,
                me: null
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error,
                token: null,
                me: null,
            };
        case 'SIGNED_UP':
            return {
                ...state,
                error: null,
                me: null,
                token: null,
            };
        case 'START_LOGIN':
            return {
                ...state,
                error: null,
                me: null,
                token: null,
                loading: true,
            };
        default:
            throw new Error(`Unknown authReducer action ${action.type}`);
    }
}

export const authActions = {
    setAuth: (token, me) => ({ type: 'SET_AUTH', token, me }),
    loginError: error => ({ type: 'LOGIN_ERROR', error }),
    logOut: () => ({ type: 'LOG_OUT' }),
    signedUp: () => ({ type: 'SIGNED_UP' }),
    setLoading: (loading) => ({ type: 'SET_LOADING', loading }),
}
