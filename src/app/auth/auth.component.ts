import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

// import {AuthService, AuthResponseData} from './auth.service';
import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as aa from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
              // private authService: AuthService,
              // private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authSate => {
      this.error = authSate.authError;
      this.isLoading = authSate.isLoading;

      if(this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }

    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  
  onHandelError() {
    // this.error = null;
    this.store.dispatch(new aa.ClearError());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new aa.LoginStart({email: email, password: password}));
    } else {
      // authObs =  this.authService.signUp(email, password);
      this.store.dispatch(new aa.SignupStart({email: email, password: password}));
    }

    // authObs.subscribe(res => {
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // }, 
    // errorMessage => { 
    //   this.error = errorMessage;
    //   this.showErrorAlert(errorMessage);
    //   this.isLoading = false;
    // });

    form.reset();
  }


  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() =>  {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
