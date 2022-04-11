import { createReducer, on } from "@ngrx/store";
import { AuthApiActions, AuthPageActions } from "./actions";
import { AuthState } from "./auth.interface";

//initial State (default value) for users slice
const initialState: AuthState = {
    user: null,
    error: ''
};


// reducer function for auth slice
export const authReducer = createReducer<AuthState>(
    initialState,
    on(
        AuthApiActions.AuthenticateSuccess, 
        (state, action): AuthState => {
            return {
               ...state,
               user: action.authResponseData
            }
        } 
    ),
    on(
       AuthApiActions.AuthenticateFail,
       (state, action): AuthState => {
           return {
               ...state,
               error: action.error
           }
       }
    ),
    on(
        AuthPageActions.Logout,
        (state): AuthState => {
            return {
                ...state,
                user: null
            }
        }
    )
);