import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as fromRecipesReducer from '../recipes/store/recipes.reducer';

export interface AppState {
    shoppingList: fromShoppingListReducer.state,
    auth: fromAuthReducer.state,
    recipes: fromRecipesReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingListReducer.shoppingListReducer,
    auth: fromAuthReducer.authReducer,
    recipes: fromRecipesReducer.recipesReducer
}