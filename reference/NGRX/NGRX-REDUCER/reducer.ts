
// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************




// ************ app/users/state/users.reducer.ts  *************
import { createReducer, on } from '@ngrx/store';
import { UserApiActions, UserPageActions } from './actions';
import { UsersState } from './users.interface';


const initialState: UsersState = {
  users: [],
  showCode: false,
  currentUserId: null,
  error: '',
};


export const userReducer = createReducer<UsersState>(
  initialState,
  on(UserApiActions.loadUsersSuccess, (state, action): UsersState => {
    return {
      ...state,
      users: action.users,
      error: '',
    };
  }),
  on(UserApiActions.loadUsersFailure, (state, action): UsersState => {
    return {
      ...state,
      users: [],
      error: action.error,
    };
  }),
  on(UserPageActions.toggleUserCode, (state, action): UsersState => {
    return {
      ...state,
      // toggle user code from 'users.component.ts'
      showCode: !action.showCode,
    };
  }),
  on(UserPageActions.chooseUser, (state, action): UsersState => {
    return {
      ...state,
      currentUserId: action.currentUserId,
    };
  }),
  on(UserApiActions.updateUserSuccess, (state, action): UsersState => {
    // update users object with updated user.
    const updatedUsers = state.users.map((item) =>
      action.user.id === item.id ? action.user : item
    );

    return {
      ...state,
      users: updatedUsers,
      currentUserId: action.user.id,
      error: '',
    };
  }),
  on(UserApiActions.updateUserFailure, (state, action): UsersState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(UserApiActions.deleteUserSuccess, (state, action): UsersState => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.userId),
      currentUserId: null,
      error: '',
    };
  }),

  on(UserApiActions.deleteUserFailure, (state, action): UsersState => {
    return {
      ...state,
      error: action.error,
    };
  })
);


