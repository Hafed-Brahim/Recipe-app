import { Component, OnInit, OnDestroy } from '@angular/core';
import { shoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private slService: shoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngrediens();
    this.igChangeSub = this.slService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditIngredient(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

}
