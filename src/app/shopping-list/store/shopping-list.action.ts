import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const STARTED_EDITING = 'STARTED_EDITING';
export const CANCEL_EDITING = 'CANCEL_EDITING'; 

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {

    }
}

export class AddEngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {

    }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient){

    }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartedEditing implements Action {
    readonly type = STARTED_EDITING;

    constructor(public payload: number) {

    }
}

export class CancelEditing implements Action {
    readonly type = CANCEL_EDITING;
}

export type shoppingListActions = AddIngredient |
                                 AddEngredients | 
                                 UpdateIngredient | 
                                 DeleteIngredient |
                                 StartedEditing |
                                 CancelEditing;