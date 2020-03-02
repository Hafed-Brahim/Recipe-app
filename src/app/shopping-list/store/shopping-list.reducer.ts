import { Ingredient } from '../../shared/ingredient.model';
import * as sla from './shopping-list.action';

export interface state {
    ingredients: Ingredient[];
    editedIgredient: Ingredient,
    editedIgredientIndex: number
}

const initialState = {
    ingredients: [],
    editedIgredient: null,
    editedIgredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: sla.shoppingListActions) {
    switch (action.type) {
        case sla.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }

        case sla.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case sla.UPDATE_INGREDIENT:
            const ing = state.ingredients[state.editedIgredientIndex];
            const updatedIng = {
                ...ing,
                ...action.payload
            }
            const updatedIngs = [...state.ingredients];
            updatedIngs[state.editedIgredientIndex] = updatedIng;

            return {
                ...state,
                ingredients: updatedIngs,
                editedIgredient: null,
                editedIgredientIndex: -1
            }
            
        case sla.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, idx) => {
                    return idx !== state.editedIgredientIndex;
                }),
                editedIgredient: null,
                editedIgredientIndex: -1
            }

        case sla.STARTED_EDITING:
            return {
                ...state,
                editedIgredientIndex: action.payload,
                editedIgredient: {
                    ...state.ingredients[action.payload]
                }
            }

        case sla.CANCEL_EDITING:
            return {
                ...state,
                editedIgredient: null,
                editedIgredientIndex: -1
            }

        default:
            return state;
    }
}