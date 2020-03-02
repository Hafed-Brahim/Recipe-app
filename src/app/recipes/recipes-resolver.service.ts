import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
// import { DataStorageService } from '../shared/data-storage.service';
// import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as ra from './store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(
        // private dataStorageService: DataStorageService,
        // private recipeService: RecipeService,
        private store: Store<fromAppReducer.AppState>,
        private action$: Actions) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipeService.getRecipes();

        // if(recipes.length ===0) {
        // return this.dataStorageService.fetchRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map((recipesData) => {
                return recipesData.recipes;
            }),
            switchMap(recipes => {
                if(recipes.length === 0) {
                    this.store.dispatch(new ra.FetchRecipes());
                    
                    return this.action$.pipe(
                        ofType(ra.SET_RECIPES),
                        take(1),
                    );
                } else {
                    return of(recipes);
                }
            })
        )
        
        // } else {
        //     return recipes;
        // }
    }

}