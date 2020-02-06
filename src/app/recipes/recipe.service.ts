import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { shoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('meat', 1),
                new Ingredient('tomatos', 5)
            ]),
        new Recipe('Another Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('meat', 1),
                new Ingredient('tomatos', 5)
            ]),
        new Recipe('Another',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('meat', 1),
                new Ingredient('tomatos', 5)
            ]),
        new Recipe('Another Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('meat', 1),
                new Ingredient('tomatos', 5)
            ])
    ];

    constructor(private slService: shoppingListService){
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngToSl(ing: Ingredient[]) {
        this.slService.addIngredients(ing);
    }

}