
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









// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************


import { createReducer, on } from '@ngrx/store';
import { State } from './app.state';
import { ItemsPageActions, ItemsApiActions } from './actions';
import { GridData } from './items.interface';


export const initialState: State = {
    items: [],
    gridData: [],
    error: 'null',
    view: 'list',
    sortedDirection: 'asc',
    filterQuery: ''
};


export const itemsReducer = createReducer<State>(
  initialState,

  // loadItemsSuccess
  on(
    ItemsApiActions.loadItemsSuccess,
    (state, action): State => {
      const updatedGrigData: GridData[] = [];      
      const allTypes: string[] = [];

      for (const item of action.items) {
        allTypes.push(item.Type);
      }

      const uniqueTypes: string[] = allTypes.filter((item, i, arr) => arr.indexOf(item) === i);
      
      let counter: number = 0;
      
      for (const uniqueTypeElement of uniqueTypes) {
        for (const allTypeElement of allTypes) {
          if (uniqueTypeElement === allTypeElement) {
            counter++;
          }
        }
        updatedGrigData.push({
          type: uniqueTypeElement,
          amount: counter
        });
        counter = 0;
      }

      return {
        ...state,
        items: action.items,
        gridData: updatedGrigData
      }
    }
  ),


  // loadItemsFailure
  on(
    ItemsApiActions.loadItemsFailure,
    (state, action): State => {
      return {
        ...state,
        error: action.error
      }
    }
  ),


  // changePageView
  on(
    ItemsPageActions.changePageView,
    (state): State => {
      return {
        ...state,
        view: state.view === 'list' ? 'grid' : 'list'
      }
    }
  ),


  // setSortDirection
  on(
    ItemsPageActions.setSortDirection,
    (state): State => {
      return {
        ...state,
        sortedDirection: state.sortedDirection === 'asc' ? 'desc' : 'asc'
      }
    }
  ),


  // setFilterBy
  on(
    ItemsPageActions.setFilterBy,
    (state, action): State => {
      return {
        ...state,
        filterQuery: action.query
      }
    }
  ),


  // updateNameSuccess
  on(
    ItemsApiActions.updateNameSuccess,
    (state, action): State => {
      console.log(action);
      
      const updatedItems = state.items.map(item => action.item.id === item.id ? action.item : item);
      console.log(updatedItems);
      
      return {
        ...state,
        items: updatedItems
      }
    }
  ),


  // updateNameFailure  
  on(
    ItemsApiActions.updateNameFailure,
    (state, action): State => {
      return {
        ...state,
        error: action.error
      }
    } 
  ),


  // clearSearch
  on(
    ItemsPageActions.clearSearch,
    (state): State => {
      return {
        ...state,
        filterQuery: ''
      }
    }
  )


);


