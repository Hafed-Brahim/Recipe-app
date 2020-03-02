import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ra from './recipes.actions';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';

@Injectable()
export class RecipesEffect {
    authQueryParam: string;

    getUser = () => {
        // this.store
        //     .select('auth')
        //     .pipe(map(authData => {
        //         return authData.user.token;
        //         // console.log( '!!!!!!!!!S!!!! ' +authData.user);
        //     }),
        //         map(user => user.token)
        //     ).subscribe(token => {
        //         this.authQueryParam = token;
        //     });
        if (localStorage.getItem('userData')) {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));

            this.authQueryParam = userData._token;
        }

    }

    @Effect()
    fetchRecipes = this.actions$.pipe(
        tap(() => {
            this.getUser();
        }),
        ofType(ra.FETCH_RECIPES),
        switchMap(() => {
            return this.http
                .get<Recipe[]>('https://recipe-app-f6ceb.firebaseio.com/recipes.json?auth=' + this.authQueryParam
                )
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            })
        }),
        map(recipes => {
            return new ra.SetRecipes(recipes);
        })
    )

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(ra.STORE_RECIPES),
        tap(() => {
            this.getUser();
        }),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(
                'https://recipe-app-f6ceb.firebaseio.com/recipes.json?auth=' + this.authQueryParam,
                recipesState.recipes);
        })
    )

    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromAppReducer.AppState>) {

    }

}