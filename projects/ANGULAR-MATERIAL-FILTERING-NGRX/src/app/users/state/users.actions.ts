import { createAction, props } from "@ngrx/store";
import { UserData } from "./users.interface";

export const loadUsers = createAction(
    '[Users Page] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users Page] Load Users Success',
    props<{ users: UserData[] }>()
);

export const loadUsersFailure = createAction(
    '[Users Page] Load Users Failure',
    props<{ error: string }>()
);

export const selectedTab = createAction(
    '[Users Page] Set Selected Tab',
    props<{ selectedTabName: string }>()
);

