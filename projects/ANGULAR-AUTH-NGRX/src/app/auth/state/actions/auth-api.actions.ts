import {createAction, props } from '@ngrx/store';
import { User } from '../auth-user.model';


export const AuthenticateSuccess = createAction(
    '[Auth] Login Success',
    props<{
        user: User,
        redirect: boolean
     }>()
);


export const AuthenticateFail = createAction(
    '[Auth] Login Fail',
    props<{ error: string }>()
);



