import { createAction, props } from '@ngrx/store';


export const LoginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
  );
  

  export const Logout = createAction(
    '[Auth] Logout'
  );

  export const LogoutSuccess = createAction(
    '[Auth] Logout Success'
  );

  export const LogoutFail = createAction(
    '[Auth] Logout Fail'
  );



  

  
  
  