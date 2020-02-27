import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private store: Store<fromAppReducer.AppState>) {

    }

    canActivate(route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {

        // return this.authService.user.pipe(
            return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(user => {
                const isAuth = !!user;

                if (isAuth) {
                    return true;
                }

                return this.router.createUrlTree(['/auth']);
            }));
    }
}