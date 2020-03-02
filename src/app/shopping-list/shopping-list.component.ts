import { Component, OnInit, OnDestroy } from '@angular/core';
// import { shoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as sla from './store/shopping-list.action';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientss: Observable<{ ingredients: Ingredient[] }>;
// private igChangeSub: Subscription;

constructor(
  // private slService: shoppingListService,
  private store: Store<fromAppReducer.AppState>) {}

  ngOnInit() {
  this.ingredientss = this.store.select('shoppingList');
  // this.ingredients = this.slService.getIngrediens();
  // this.igChangeSub = this.slService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
  //   this.ingredients = ingredients;
  // })
}

  onEditIngredient(index: number) {
  // this.slService.startedEditing.next(index);
  this.store.dispatch(new sla.StartedEditing(index));
}

  ngOnDestroy() {
  // this.igChangeSub.unsubscribe();
}

}
