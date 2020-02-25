import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageservice: DataStorageService) {
  }

  ngOnInit() {
    console.log('heyyyyyyy')
    const a = this.dataStorageservice.fetchRecipes().subscribe();
    console.log(a)
  }

}
