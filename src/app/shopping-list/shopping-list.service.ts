import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class shoppingListService {

    ingredientChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngrediens() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addIngredients(ing: Ingredient[]) {
        this.ingredients.push(...ing);
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}