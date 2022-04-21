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

            console.log(updatedUsers);
            

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
    ),
    on(
        UserApiActions.deleteCurrentUserSuccess,
        (state, action): UserState =>  {
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId),
                currentUserId: null,
                error: ''
            }
        }
    ),
    on(
        UserApiActions.deleteCurrentUserFailure,
        (state, action): UserState => {
            return {
                ...state,
                error: action.error
            }
        }
    ),
    on(
        UserPageActions.initializeCurrentUser,
        (state): UserState => {
            return {
                ...state,
                currentUserId: 0
            }
        }
    ),
    // After a create, the currentProduct is the new product.
    on(
        UserApiActions.createUserSuccess,
        (state, action): UserState => {
            return {
                ...state,
                // add new user to the end of rest users.
                users: [...state.users, action.user], 
                currentUserId: action.user.id,
                error: ''
            }
        }
    ),
    on(
        UserApiActions.createUserFailure,
        (state, action): UserState => {
            return {
                ...state,
                error: action.error
            }
        }
    )



);