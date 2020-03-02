// the data storage service is no longer used to fetch and store recipes 
// instead we use the ngrx recipes effects

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, tap } from 'rxjs/operators';
// import * as fromAppReducer from '../store/app.reducer';
// import * as ra from '../recipes/store/recipes.actions';

// // import { RecipeService } from '../recipes/recipe.service';
// import { Recipe } from '../recipes/recipe.model';
// import { Store } from '@ngrx/store';

// @Injectable({ providedIn: 'root' })
// export class DataStorageService {

//     constructor(
//         private http: HttpClient,
//         // private recipeService: RecipeService,
//         private store: Store<fromAppReducer.AppState>) {

//     }

//     storeRecipes() {
//         // const recipes = this.recipeService.getRecipes();
//         // this.http.put('https://recipe-app-f6ceb.firebaseio.com/recipes.json', recipes)
//         //     .subscribe(res => console.log(res));
//         return;
//     }

//     fetchRecipes() {
//         return this.http
//             .get<Recipe[]>('https://recipe-app-f6ceb.firebaseio.com/recipes.json')
//             .pipe(
//                 map(recipes => {
//                     return recipes.map(recipe => {
//                         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
//                     })
//                 }),
//                 tap(recipes => {
//                     // this.recipeService.setRecipes(recipes);
//                     this.store.dispatch(new ra.SetRecipes(recipes));
//                 }));
//     }
// }