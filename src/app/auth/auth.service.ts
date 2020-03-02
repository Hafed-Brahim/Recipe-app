import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as aa from './store/auth.actions';

// export interface AuthResponseData {
//     kind: string;
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered?: boolean; 
// }

@Injectable()
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    private tokenExperationTimer: any;
    
    constructor(
        // private http: HttpClient, 
        // private router: Router,
        private store: Store<fromApp.AppState>) {

    }
    
    setLogoutTimer(expirationDuration: number) {
        console.log(expirationDuration)
        this.tokenExperationTimer = setTimeout(() => {
            this.store.dispatch(new aa.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if(this.tokenExperationTimer) {
            clearTimeout(this.tokenExperationTimer);
            this.tokenExperationTimer = null;
        }
    }

    // signUp(email: string, password: string) {
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, 
    //     {email: email,
    //     password: password,
    //     returnSecureToken: true})
    //     .pipe(catchError(this.handelError),
    //           tap(resData => {
    //            this.handelAuthentivcation(resData.email, 
    //                                     resData.localId,
    //                                     resData.idToken, 
    //                                     +resData.expiresIn)
    //           }))
    // }

    // login(email: string, password:string) {
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, 
    //     {email: email,
    //     password: password,
    //     returnSecureToken: true
    //     })
    //     .pipe(catchError(this.handelError), 
    //           tap(resData => {
    //               this.handelAuthentivcation(resData.email, 
    //                 resData.localId,
    //                 resData.idToken, 
    //                                       +resData.expiresIn)
    //           }));
    // }

    // autoLogin() {
    //     const userData: {
    //         email: string,
    //         id: string,
    //         _token: string,
    //         _tokenExpirationDate: string
    //     } = JSON.parse(localStorage.getItem('userData'));

    //     if(!userData) {
    //         return;
    //     }

    //     const loadedUser = new User(userData.email, 
    //                                 userData.id, 
    //                                 userData._token, 
    //                                 new Date(userData._tokenExpirationDate));
                                
    //     if(loadedUser.token) {
    //         // this.user.next(loadedUser);
    //         this.store.dispatch(new aa.AuthenticateSuccess(loadedUser));

    //         const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //         this.autoLogout(expirationDuration);
    //     }
    // }

    // logout() {
    //     // this.user.next(null);
    //     this.store.dispatch(new aa.Logout());
    //     this.router.navigate(['/auth']);
    //     localStorage.removeItem('userData');

    //     if(this.tokenExperationTimer) {
    //         clearTimeout(this.tokenExperationTimer);
    //     }

    //     this.tokenExperationTimer = null;
    // }


    // private handelAuthentivcation(email: string, userId: string, token: string, expiresIn: number) {
    //     const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    //     const user = new User(email, userId, token, expirationDate);

    //     // this.user.next(user);
    //     this.store.dispatch(new aa.AuthenticateSuccess(user));
    //     this.autoLogout(expiresIn*1000);

    //     localStorage.setItem('userData', JSON.stringify(user));
    // }

    // private handelError(errorRes: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occured!';

    //         if(!errorRes || !errorRes.error.error) {
    //             return throwError(errorMessage);
    //         }

    //         switch (errorRes.error.error.message) {
    //             case 'EMAIL_EXISTS':
    //                 errorMessage = 'this email already exists!'
    //                 break;

    //             case 'EMAIL_NOT_FOUND':
    //                 errorMessage = 'this email doesn\'t exist';
    //                 break;

    //             case 'INVALID_PASSWORD':
    //                 errorMessage = 'the password is incorrect';
    //                 break;
    //         }

    //         return throwError(errorMessage);
    // }

}