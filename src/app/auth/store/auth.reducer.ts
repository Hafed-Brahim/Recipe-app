import { User } from '../user.model';
import * as aa from './auth.actions';


export interface state {
    user: User
    authError: string
    isLoading: boolean
}

const initialState = {
    user: null,
    authError: null,
    isLoading: false
}

export function authReducer(state = initialState, action: aa.AuthActions) {
    switch (action.type) {
        case aa.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                authError: null,
                isLoading: false
            };

        case aa.LOGOUT:
            return {
                ...state, 
                user: null,

            };

        case aa.LOGIN_START:
        case aa.SIGNUP_START:
            return {
                ...state,
                authError: null,
                isLoading: true
            }

        case aa.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                isLoading: false
            }

        case aa.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }

        default:
            return state;
    }
}