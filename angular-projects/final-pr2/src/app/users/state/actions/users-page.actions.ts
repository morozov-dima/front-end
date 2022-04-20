import { createAction, props } from "@ngrx/store";
import { User } from "../users.interface";

export const loadUsers = createAction(
    '[Users Page] Load Users'
);

export const toggleEmail = createAction(
    '[Users Page] Toggle Email'
);

export const setCurrentUser = createAction(
    '[Users Page] Set Current User',
    props<{ userId: number }>()
);

export const updateCurrentUser = createAction(
    '[Users Page] Update Current User',
    props<{ currentUser: User }>()
);