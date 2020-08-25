export function authReducer(state, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
                loading: false,
                me: null,
                loginError: null,
                invalidCredentialError: null
            };
        case 'LOG_OUT':
            return {
                ...state,
                token: null,
                me: null
            };
        case 'SET_ME':
            return {
                ...state,
                me: action.me
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
    setToken: token => ({ type: 'SET_TOKEN', token }),
    setMe: me => ({ type: 'SET_ME', me }),
    loginError: error => ({ type: 'LOGIN_ERROR', error }),
    logOut: () => ({ type: 'LOG_OUT' }),
    signedUp: () => ({ type: 'SIGNED_UP' }),
    startLogin: () => ({ type: 'START_LOGIN' }),
}
