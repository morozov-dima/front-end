import { Action } from '@ngrx/store';




// 1. here we create list of our constants that we will export
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';






// 'AuthenticateSuccess' action
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}




// 'Logout' action. 
// This class has no payload, so it dosen't need constructor.
export class Logout implements Action {
  readonly type = LOGOUT;
}






// 'LoginStart' action
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  // for login we need email and password . this is how our actions
  // should look like.
  constructor(public payload: { email: string; password: string }) {}
}




// 'AuthenticateFail' action
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}




// 'SignupStart' action
export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}





// ClearError action
export class ClearError implements Action {
  // here we have only type.
  readonly type = CLEAR_ERROR;
}




// 'AutoLogin' action
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}




// here we add actions to the Union type
export type AuthActions =
    AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin;
