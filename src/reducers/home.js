
export function homeReducer(state, action) {
    switch (action.type) {
        case 'SET_ALL':
            return {
                ...state,
                ingredients: action.ingredients,
                recipes: action.recipes,
                tags: action.tags,
                error: null,
            }
        case 'SET_MODEL_OBJECTS':
            return {
                ...state,
                [action.modelName]: action.modelObjects,
            }
        case 'MODEL_CREATED':
            return {
                ...state,
                [action.modelName]: [...state[action.modelName], action.modelObject],
                error: null,
            }
        case 'MODEL_DELETED':
            return {
                ...state,
                [action.modelName]: state[action.modelName].filter(i => i.id !== action.modelObjectId),
                error: null,
            }
        case 'MODEL_PATCHED':
            return {
                ...state,
                [action.modelName]: state[action.modelName].map(
                    i => i.id === action.modelObject.id ? action.modelObject : i
                ),
                error: null,
            }
        default:
            throw new Error(`Unknown homeReducer action ${action.type}`);
    }
}

export const homeActions = {
    setAll: (recipes, tags, ingredients) => ({ type: 'SET_ALL', recipes, ingredients, tags }),
    set: (modelName, modelObjects) => ({ type: 'SET_MODEL_OBJECTS', modelName, modelObjects }),

    patched: (modelName, modelObject) => ({ modelName, modelObject, type: 'MODEL_PATCHED' }),
    deleted: (modelName, modelObjectId) => ({ modelName, modelObjectId, type: 'MODEL_DELETED' }),
    created: (modelName, modelObject) => ({ modelName, modelObject, type: 'MODEL_CREATED' }),
};
