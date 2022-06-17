import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.interface';

const selectUsersFeatureState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
    selectUsersFeatureState,
    (state) => {
        return state.users
    }
);

export const selectSelectedTabName = createSelector(
    selectUsersFeatureState,
    (state) => {
        return state.selectedTabName
    }
);


export const selectUsersByType = createSelector(
    selectUsersFeatureState,
    selectSelectedTabName,
    (state, selectedTabName) => {
        // console.log(state);
        // console.log(selectedTabName);
        if(selectedTabName === 'all') {
            return state.users;
        } else {
            return state.users.filter((data) => {return data.type === selectedTabName});
        }
        
    }
);





