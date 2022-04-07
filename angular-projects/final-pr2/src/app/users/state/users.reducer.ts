import { createReducer, on } from "@ngrx/store";
import { UserApiActions } from "./actions";
import { UserState } from "./users.interface";


const initialState: UserState = {
    users: [],
    error: ''
};

// reducer function for users slice
export const userReducer = createReducer<UserState>(
    initialState,
    on(
       UserApiActions.loadUsersSuccess,
       (state, action): UserState => {
           return {
               ...state,
               users: action.users,
               error: ''
           }
       } 
    ),
    on(
        UserApiActions.loadUsersFailure,
        (state, action): UserState => {
            return {
                ...state,
                users: [],
                error: action.error
            }
        }
    )
);