import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const FETCH_RECIPES = '[Recipes] Fetch recipes';
export const STORE_RECIPES = '[Recipes] Store recipes';
export const SET_RECIPES = '[Recipes] Set recipes';
export const ADD_RECIPE = '[Recipes] Add recipe';
export const UPDATE_RECIPE = '[Recipe] Update recipe';
export const DELETE_RECIPE = '[Recipe] Delete recipe';
export const SELECT_RECIPE = '[Recipe] Select recipe';


export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) {
        
    }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {

    }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: {index: number, newRecipe: Recipe}) {

    }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) {

    }
}

export class SelectRecipe implements Action {
    readonly type = SELECT_RECIPE;

    constructor(public payload: number) {

    }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
 }

export type RecipesActions = SetRecipes |
                             AddRecipe |
                             UpdateRecipe |
                             DeleteRecipe |
                             SelectRecipe |
                             FetchRecipes |
                             StoreRecipes;