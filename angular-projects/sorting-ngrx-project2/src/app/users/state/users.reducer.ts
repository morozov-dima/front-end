import { createReducer, on } from "@ngrx/store";
import * as usersActions from './users.actions';
import { UsersState } from "./users.interface";


const initialState: UsersState = {
    users: [],
    error: ''
};

export const usersReducer = createReducer(
    initialState,
    on(
        usersActions.loadUsersSuccess,
        (state, action): UsersState => {
            return {
                ...state,
                users: action.users
            }
        }
    ),
    on(
       usersActions.loadUsersFailure,
       (state, action): UsersState => {
           return {
               ...state,
               users: [],
               error: action.error
           }
       }
    )

);