
export function homeReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_TAB':
            return {
                ...state,
                selectedTab: action.tab
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading,
            }

        case 'SET_RECIPES':
            return {
                ...state,
                recipes: action.recipes,
            }
        case 'SET_INGREDIENTS': {
            return {
                ...state,
                ingredients: action.ingredients,
            }
        }
        case 'SET_TAGS': {
            return {
                ...state,
                tags: action.tags,
            }
        }
        case 'SET_ERROR': {
            return {
                ...state,
                error: action.error,
            }
        }
        case 'SET_ALL': {
            return {
                ...state,
                ingredients: action.ingredients,
                recipes: action.recipes,
                tags: action.tags,
                error: null,
            }
        }
        default:
            throw new Error(`Unknown homeReducer action ${action.type}`);
    }
}

export const homeActions = {
    changeTab: tab => ({ type: 'CHANGE_TAB', tab }),
    setRecipes: (recipes) => ({ type: 'SET_RECIPES', recipes }),
    setIngredients: (ingredients) => ({ type: 'SET_INGREDIENTS', ingredients }),
    setTags: (tags) => ({ type: 'SET_TAGS', tags }),
    setLoading: (loading) => ({ type: 'SET_LOADING', loading }),
    setError: (error) => ({ type: 'SET_ERROR', error }),
    setAll: (recipes, ingredients, tags) => ({ type: 'SET_ALL', recipes, ingredients, tags })
};
