import { User } from '../user.model';
import * as AuthActions from './auth.actions';




export interface State {
  user: User;
  authError: string;
  loading: boolean;
}




const initialState: State = {
  user: null,
  authError: null,
  loading: false
};





// 'authReducer' function that we export
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {

    // AUTHENTICATE_SUCCESS case
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      // we don't need to emit this with a subject,
      // we simply have to return this as part of
      // our state for this part of the application store.
      return {
        // always copy the old state
        ...state,
        // then overwrite what you want to overwrite
        authError: null,
        user: user,
        loading: false
      };

    // LOGOUT case  
    case AuthActions.LOGOUT:
      return {
        // copy the old state 
        ...state,
        // set user to 'null' 
        user: null
      };

    // LOGIN_START and SIGNUP_START case  
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    // AUTHENTICATE_FAIL case  
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };

    // CLEAR_ERROR case  
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    // default case (unchanged state)
    default:
      return state;
  }
}
