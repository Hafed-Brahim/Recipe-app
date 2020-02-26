import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
// import { shoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as sla from '../shopping-list/store/shopping-list.action';
import * as fromSoppingListReducer from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('tomatos', 5)
    //         ]),
    //     new Recipe('Another Test Recipe',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('tomatos', 5)
    //         ]),
    //     new Recipe('Another',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('tomatos', 5)
    //         ]),
    //     new Recipe('Another Test Recipe',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('tomatos', 5)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(
                // private slService: shoppingListService,
                private store: Store<fromSoppingListReducer.appState>){
    
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngToSl(ing: Ingredient[]) {
        // this.slService.addIngredients(ing);
        this.store.dispatch(new sla.AddEngredients(ing));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}