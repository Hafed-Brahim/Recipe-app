import { Component, OnInit } from '@angular/core';
// import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as ra from './store/recipes.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  constructor(
    // private dataStorageservice: DataStorageService,
    private store: Store<fromAppReducer.AppState>) {
  }

  ngOnInit() {
    // const a = this.dataStorageservice.fetchRecipes().subscribe();

    this.store.dispatch(new ra.FetchRecipes());
  }

}
