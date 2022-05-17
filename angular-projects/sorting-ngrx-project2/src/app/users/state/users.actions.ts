import { createAction, props } from '@ngrx/store';
import { User } from './users.interface';

export const loadUsers = createAction(
    '[Users Page] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users Page] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[Users Page] Load Users Failure',
    props<{ error: string }>()
);

export const showAllUsers = createAction(
    '[Users Page] Get All Users'
);

export const showUsersSortedByName = createAction(
    '[Users Page] Show Users Sorted By Name'
);

export const showUsersSortedByAge = createAction(
    '[Users Page] Show Users Sorted By Age'
);


export const selectedTab = createAction(
    '[Users Page] Select Tab',
    props<{ selectedTab: number }>()
);