import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
// import { shoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as sla from '../store/shopping-list.action';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild("form", {static: false}) slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
              // private slService: shoppingListService,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIgredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIgredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    })

    // this.subscription = this.slService.startedEditing
    //   .subscribe((index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   });
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if(!this.editMode) {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new sla.AddIngredient(newIngredient));
    }else {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new sla.UpdateIngredient(newIngredient));
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new sla.CancelEditing());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new sla.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new sla.CancelEditing());
  }

}
