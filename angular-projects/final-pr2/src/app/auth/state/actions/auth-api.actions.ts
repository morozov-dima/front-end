import {createAction, props } from '@ngrx/store';
import { User } from '../auth-user.model';
import { AuthResponseData } from '../auth.interface';


export const AuthenticateSuccess = createAction(
    '[Auth] Login Success',
    props<{user: User }>()
);


export const AuthenticateFail = createAction(
    '[Auth] Login Success',
    props<{ error: string }>()
);


