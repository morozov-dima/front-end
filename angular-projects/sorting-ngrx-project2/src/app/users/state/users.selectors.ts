import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.interface';


const selectUsersFeatureState = createFeatureSelector<UsersState>('users');


export const selectAllUsers = createSelector(
    selectUsersFeatureState,
    state => state.users
);

export const selectSortedUsers = createSelector(
    selectUsersFeatureState,
    (state) => {
       return state.usersSorted;
    }
);