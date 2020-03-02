import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import * as fromAppReducer from '../../store/app.reducer';
import * as ra from '../store/recipes.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as sla from '../../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  subscription: Subscription;

  constructor(
              // private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // this.recipe = this.recipeService.getRecipe(this.id);
      this.store
        .select('recipes')
        .pipe(map(recipesData => {
          return recipesData.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })).subscribe(recipe => {
          this.recipe = recipe;
        })
    })
  }

  onEdirRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onToShoppingList() {
    // this.recipeService.addIngToSl(this.recipe.ingredients);
    this.store.dispatch(new sla.AddEngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new ra.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
