import {createAction, props } from '@ngrx/store';
import { AuthResponseData } from '../auth.interface';


export const AuthenticateSuccess = createAction(
    '[Auth] Login Success',
    props<{authResponseData: AuthResponseData }>()
);


export const AuthenticateFail = createAction(
    '[Auth] Login Success',
    props<{ error: string }>()
);