import { createReducer, on } from "@ngrx/store";
import { UserApiActions, UserPageActions } from "./actions";
import { UserState } from "./users.interface";


const initialState: UserState = {
    users: [],
    displayEmail: true,
    currentUserId: null,
    error: ''
};

// reducer function for users slice
export const userReducer = createReducer<UserState>(
    initialState,
    on(
       UserApiActions.loadUsersSuccess,
       (state, action): UserState => {
           return {
               ...state,
               users: action.users,
               error: ''
           }
       } 
    ),
    on(
        UserApiActions.loadUsersFailure,
        (state, action): UserState => {
            return {
                ...state,
                users: [],
                error: action.error
            }
        }
    ),
    on(
        UserPageActions.toggleEmail,
        (state): UserState => {
            return {
                ...state,
                displayEmail: !state.displayEmail
            }
        }
    ),
    on(
        UserPageActions.setCurrentUser,
        (state, action): UserState => {
            return {
                ...state,
                currentUserId: action.userId
            }
        }
    ),
    on(
        UserApiActions.updateCurrentUserSuccess,
        (state, action): UserState => {
            // update store users slice with updated user.
            const updatedUsers = state.users.map(
                user => action.currentUser.id === user.id ? action.currentUser : user 
            );

            return {
                ...state,
                users: updatedUsers,
                currentUserId: action.currentUser.id,
                error: ''
            };
        }
    ),
    on(
        UserApiActions.updateCurrentUserFailure,
        (state, action): UserState => {
            return {
                ...state,
                error: action.error
            }
        }   
    ) 



);