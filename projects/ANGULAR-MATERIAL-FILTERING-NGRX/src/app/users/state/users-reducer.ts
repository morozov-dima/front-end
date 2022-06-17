import { createReducer, on } from "@ngrx/store";
import * as usersActions from './users.actions';
import { UserState } from "./users.interface";

const initialState: UserState = {
    users: [],
    selectedTabName: 'all',
    error: ''
};

export const usersReducer = createReducer(
    initialState,
    on(
        usersActions.loadUsersSuccess,
        (state, action): UserState => {
            return {
                ...state,
                users: action.users
            }
        }
    ),
    on (
        usersActions.loadUsersFailure,
        (state, action): UserState => {
            return {
                ...state,
                error: action.error
            }
        }
    ),
    on(
        usersActions.selectedTab,
        (state, action): UserState => {
            return {
                ...state,
                selectedTabName: action.selectedTabName
            }
        }
    )
);