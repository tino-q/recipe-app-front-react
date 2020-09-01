import axios from 'axios';
import env from '@env';
import ERRORS from '@errors';

const backend = axios.create({ baseURL: env.RECIPE_API_BASE_URL });

const errorHandler = async fn => {
    try {
        return await fn();
    } catch (e) {
        const error = new Error('Recipe API Error');
        const status = e?.response?.status;
        error.data = e?.response?.data;
        error.type = status >= 400 && status < 500 ?
            ERRORS.STATUS_400 :
            ERRORS.UNKNOWN_SERVER_ERROR;

        if (error?.data?.non_field_errors?.includes("Unable to authenticate with provided credentials")) {
            console.log('het');
            error.type = ERRORS.INVALID_CREDENTIALS;
        }

        console.log(error.type);

        if (error.type === ERRORS.STATUS_400) {
            error.displayText = JSON.stringify(error.data, null, 2);
        } else {
            error.displayText = "Whoops! This was not meant to happen.";
        }
        throw error;
    }
}

const authHeaders = token => ({
    headers: {
        'Authorization': `Token ${token}`
    }
});

export const signUp = async (name, email, password) => errorHandler(async () => {
    console.log('signUp');
    const { data } = await backend.post('/user/create/', { name, email, password });
    return data;
});

export const logIn = async (email, password) => errorHandler(async () => {
    console.log('login');
    const { data: { token } } = await backend.post('/user/token/', { email, password });
    return token;
});


export const getMe = async (token) => errorHandler(async () => {
    console.log('getMe');
    const { data } = await backend.get('/user/me/', authHeaders(token));
    return data;
});


export const patchMe = async (token, params) => errorHandler(async () => {
    console.log('patchMe', JSON.stringify({ params }));
    const { data } = await backend.patch(`/user/me/`, params, authHeaders(token));
    return data;
});


export const get = async (token, modelName) => errorHandler(async () => {
    console.log('get', modelName);
    const { data } = await backend.get(`/recipe/${modelName}/`, authHeaders(token));
    return data;
});


export const create = async (token, modelName, modelObject) => errorHandler(async () => {
    console.log('create', JSON.stringify({ modelName, modelObject }));
    const { data } = await backend.post(`/recipe/${modelName}/`, modelObject, authHeaders(token));
    return data;
});

export const destroy = async (token, modelName, modelObjectId) => errorHandler(async () => {
    console.log('destroy', JSON.stringify({ modelName, modelObjectId }));
    const { data } = await backend.delete(`/recipe/${modelName}/${modelObjectId}/`, authHeaders(token));
    return data;
});

export const patch = async (token, modelName, id, params) => errorHandler(async () => {
    console.log('patch', JSON.stringify({ modelName, id, params }));
    const { data } = await backend.patch(`/recipe/${modelName}/${id}/`, params, authHeaders(token));
    return data;
});

