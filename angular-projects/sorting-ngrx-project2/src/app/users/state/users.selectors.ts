import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.interface';


const selectUsersFeatureState = createFeatureSelector<UsersState>('users');



export const selectAllUsers = createSelector(
    selectUsersFeatureState,
    state => state.users
);





export const selectUsersByAge = createSelector(
    selectUsersFeatureState,
    (state) => {
        let updatedUsers = state.users.slice(0);
        updatedUsers.sort((a: any, b:any) => a.age - b.age);
        return updatedUsers;
    }
);


export const selectUsersByName = createSelector(
    selectUsersFeatureState,
    (state) => {
        let updatedUser = state.users.slice(0);
        updatedUser.sort((a:any, b:any) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        return updatedUser;
    }
);


