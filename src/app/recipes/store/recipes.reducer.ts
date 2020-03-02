import { Recipe } from '../recipe.model';
import * as ra from './recipes.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

export interface State {
    recipes: Recipe[]
    selectedRecipe: Recipe
}

const initialState = {
    recipes: [],
    selectedRecipe: null
}

export function recipesReducer(state = initialState, action: ra.RecipesActions) {
    switch (action.type) {
        case ra.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }

        case ra.SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: state.recipes[action.payload]
            }

        case ra.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }

        case ra.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            }

        case ra.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, indx) => {
                    return indx!==action.payload;
                })
            }

        default:
            return state;
    }
}