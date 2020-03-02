import { Actions, ofType, Effect } from '@ngrx/effects';
import * as aa from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handelAuthentication = (resData: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);

    localStorage.setItem('userData', JSON.stringify(user));

    return new aa.AuthenticateSuccess({user: new User(resData.email,
        resData.localId,
        resData.idToken,
        expirationDate),
        redirect: true});
};

const handelAuthError = (errorRes) => {
    let errorMessage = 'An unknown error occured!';

    if (!errorRes || !errorRes.error.error) {
        return of(new aa.AuthenticateFail(errorMessage));
    }

    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'this email already exists!'
            break;

        case 'EMAIL_NOT_FOUND':
            errorMessage = 'this email doesn\'t exist';
            break;

        case 'INVALID_PASSWORD':
            errorMessage = 'the password is incorrect';
            break;
    }

    return of(new aa.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(aa.SIGNUP_START),
        switchMap((signupAction: aa.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                })
                .pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(authData => {
                        return handelAuthentication(authData);
                    }),
                    catchError(errorRes => {
                        return handelAuthError(errorRes);
                    })

                )
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(aa.LOGIN_START),
        switchMap((authData: aa.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                })
                .pipe(
                    tap((resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    })),
                    map(resData => {
                        return handelAuthentication(resData);
                    }),
                    catchError(errorRes => {
                        return handelAuthError(errorRes);
                    }))
        }),

    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(aa.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: aa.AuthenticateSuccess) => {
            if(authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    )

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(aa.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(aa.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return {type: 'DUMMY'};
            }

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate));

            if (loadedUser.token) {
                // this.user.next(loadedUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);

                return new aa.AuthenticateSuccess({user: loadedUser, redirect: false});

                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
            }

            return {type: 'DUMMY'};
        })
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router,
                private authService: AuthService) {

    }
}