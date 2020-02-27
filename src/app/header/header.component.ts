import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as aa from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isLogedIn = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromAppReducer.AppState>) {

  }

  ngOnInit() {
    // this.userSub = this.authService.user.subscribe(user => {
      this.userSub = this.store.select('auth')
      .pipe(map(authSate => authSate.user))
      .subscribe(user => {
        this.isLogedIn = !user ? false : true;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new aa.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
