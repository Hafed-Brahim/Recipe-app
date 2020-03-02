import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate fail';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = '[Auth] Signup start';
export const CLEAR_ERROR = '[Auth] Clear error';
export const AUTO_LOGIN = '[Ath] Auto login';


export class LoginStart implements Action {
    readonly type = LOGIN_START;
    
    constructor(public payload: {email: string, password: string}) {
        
    }
}

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload: {user: User, redirect: boolean}) {

    }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {

    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string, password: string}) {

    }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess | 
                          Logout |
                          LoginStart |
                          AuthenticateFail |
                          SignupStart |
                          ClearError |
                          AutoLogin;