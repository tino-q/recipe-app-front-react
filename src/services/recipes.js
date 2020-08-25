import env from '@env';
import axios from 'axios';
import ERRORS from '@errors';

const backend = axios.create({ baseURL: env.RECIPE_API_BASE_URL });

export async function signUp(name, email, password) {
    try {
        console.log('SignUp');
        const { data } = await backend.post('/user/create/', {
            name, email, password
        });
        return data;
    } catch (e) {
        throw ERRORS.UNKNOWN_ERROR;
    }
}

export async function logIn(email, password) {
    try {
        console.log('login');
        const { data: { token } } = await backend.post('/user/token/', {
            email, password
        });
        await new Promise(resolve => setTimeout(resolve, 1222));
        return token;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;
        throw ERRORS.UNKNOWN_ERROR;
    }
}

export async function getMe(token) {
    try {
        console.log('getMe');
        const { data } = await backend.get('/user/me/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return data;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;

        throw ERRORS.UNKNOWN_ERROR;
    }
}

export async function getRecipes(token) {
    try {
        console.log('getRecipes');
        const { data } = await backend.get('/recipe/recipes/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return data;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;

        throw ERRORS.UNKNOWN_ERROR;
    }
}

export async function getIngredients(token) {
    try {
        console.log('getIngredients');
        const { data } = await backend.get('/recipe/ingredients/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return data;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;

        throw ERRORS.UNKNOWN_ERROR;
    }
}


export async function getTags(token) {
    try {
        console.log('getTags');
        const { data } = await backend.get('/recipe/tags/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return data;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;

        throw ERRORS.UNKNOWN_ERROR;
    }
}


export async function createTag(token, name) {
    try {
        console.log('createTag', name);
        const { data } = await backend.post('/recipe/tags/', { name }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return data;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;

        throw ERRORS.UNKNOWN_ERROR;
    }
}

export async function createIngredient(token, name) {
    try {
        console.log('createTag', name);
        const { data } = await backend.post('/recipe/ingredients/', { name }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return data;
    } catch (e) {
        const status = e?.response?.status;
        if (status >= 400 && status < 500)
            throw ERRORS.INVALID_CREDENTIALS;

        throw ERRORS.UNKNOWN_ERROR;
    }
}