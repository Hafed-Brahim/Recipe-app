import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';

import * as fromAppReducer from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    ShoppingModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule {
}
