import { createReducer, on } from "@ngrx/store";

import * as userAction from './user.actions';
import { UserState } from "./user.interface";






// initial State (default values) for producrts slice
const initialState: UserState = {
    showUserName: true
};




// reducer function for user slice
export const userReducer = createReducer<UserState>(
   initialState,
   on(
      // call to cation 
      userAction.maskUserName,
      (state): UserState => {
          return {
              ...state,
              showUserName: !state.showUserName
          }
      }
   ) 
);


