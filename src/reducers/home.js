
export function homeReducer(state, action) {
    switch (action.type) {
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
        case 'INGREDIENT_CREATED': {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                error: null,
            }
        }
        case 'TAG_CREATED': {
            return {
                ...state,
                tags: [...state.tags, action.tag],
                error: null,
            }
        }
        case 'TAG_DELETED': {
            return {
                ...state,
                tags: state.tags.filter(tag => tag.id !== action.tagId),
                error: null,
            }
        }
        case 'TAG_UPDATED': {
            return {
                ...state,
                tags: state.tags.map(tag => (tag.id === action.updatedTag.id) ?
                    ({ ...tag, name: action.updatedTag.name }) :
                    ({ ...tag })
                ),
                error: null,
            }
        }
        case 'INGREDIENT_DELETED': {
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i.id !== action.ingredientId),
                error: null,
            }
        }
        case 'RECIPE_UPDATED': {
            return {
                ...state,
                recipes: state.recipes.map(
                    recipe => recipe.id === action.updatedRecipe.id ? action.updatedRecipe : recipe
                ),
                error: null,
            }
        }
        case 'RECIPE_DELETED': {
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.recipeId),
                error: null,
            }
        }
        case 'RECIPE_CREATED': {
            return {
                ...state,
                recipes: [...state.recipes, action.recipe],
                error: null,
            }
        }
        default:
            throw new Error(`Unknown homeReducer action ${action.type}`);
    }
}

export const homeActions = {
    setRecipes: (recipes) => ({ type: 'SET_RECIPES', recipes }),
    setIngredients: (ingredients) => ({ type: 'SET_INGREDIENTS', ingredients }),
    setTags: (tags) => ({ type: 'SET_TAGS', tags }),
    setLoading: (loading) => ({ type: 'SET_LOADING', loading }),
    setError: (error) => ({ type: 'SET_ERROR', error }),
    setAll: (recipes, tags, ingredients) => ({ type: 'SET_ALL', recipes, ingredients, tags }),
    tagCreated: tag => ({ type: 'TAG_CREATED', tag }),
    tagDeleted: tagId => ({ type: 'TAG_DELETED', tagId }),
    ingredientCreated: ingredient => ({ type: 'INGREDIENT_CREATED', ingredient }),
    ingredientDeleted: ingredientId => ({ type: 'INGREDIENT_DELETED', ingredientId }),
    tagUpdated: updatedTag => ({ type: 'TAG_UPDATED', updatedTag }),
    recipeUpdated: updatedRecipe => ({ type: 'RECIPE_UPDATED', updatedRecipe }),
    recipeDeleted: recipeId => ({ type: 'RECIPE_DELETED', recipeId }),
    recipeCreated: recipe => ({ type: 'RECIPE_CREATED', recipe }),
};
