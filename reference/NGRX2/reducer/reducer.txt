// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************



import { createReducer, on } from "@ngrx/store";
import * as usersActions from './users.actions';
import { UsersState } from "./users.interface";


const initialState: UsersState = {
    users: [],
    usersSorted: [],
    error: '',
    userType: 'all'
};

export const usersReducer = createReducer(
    initialState,
    on(
        usersActions.loadUsersSuccess,
        (state, action): UsersState => {
            return {
                ...state,
                users: action.users
            }
        }
    ),
    on(
       usersActions.loadUsersFailure,
       (state, action): UsersState => {
           return {
               ...state,
               users: [],
               error: action.error
           }
       }
    )

);











// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************


// ************ app/users/state/users.reducer.ts  *************
import { createReducer, on } from '@ngrx/store';
import { UserApiActions, UserPageActions } from './actions';
import { UsersState } from './users.interface';

// initial State (default value) for users slice
const initialState: UsersState = {
  users: [],
  showCode: false,
  currentUserId: null,
  error: '',
};

// reducer function for users slice
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
// **************************** Example 2 *******************************
// **********************************************************************


// ********* app/products/state/products.reducer.ts ***********


import { createReducer, on } from "@ngrx/store";

// here we use alias 'productsActions'
import * as productsActions from './products.actions';
import { ProductState } from "./products.interface";



// initial State (default values) for producrts slice
const initialState: ProductState = {
    showProductCode: true,
    trigger: 'default text',
    currentProductId: null,
    products: [],
    error: ''
};



// reducer function for products slice
export const productReducer = createReducer<ProductState>(
    initialState,
   on(
      // call to action 
      productsActions.toggleProductCode,
      // 'return type' is the 'ProductState'
      (state): ProductState => {
          return {
              ...state,
              showProductCode: !state.showProductCode
          }
      }
   ),
   on(
    // call to action 
    productsActions.setProductCode,
    // here we set second parameter 'action'
    (state, action): ProductState => {
        return {
            // we copy the existing state
            ...state,
            // 'action.trigger' this is data that we set inside our component
            // store will updated with the new state.
            trigger: action.trigger
        }
    }
 ),
    on(
       productsActions.loadProductsSuccess,
       (state, action): ProductState => {
            return {
               ...state,
               products: action.products,
               error: '' 
            }
       }
    ),
    on(
        productsActions.loadProductsFailure,
        (state, action): ProductState => {
             return {
                ...state,
                // if error appear we set products array to empty.
                products: [],
                error: action.error 
             }
        }
     )   
);




















// **********************************************************************
// **************************** Example 3 *******************************
// **********************************************************************


// ********* app/apartments/state/apartments-reducer.ts ***********

import { createReducer, on } from "@ngrx/store";
import * as apartmentsActions from "./apartments-actions";
import { ApartmentsState } from "./apartments-interface";




const initialState: ApartmentsState = {
    apartments: [],
    error: '',
    starRating: {
        starRating_1: false,
        starRating_2: false,
        starRating_3: false,
        starRating_4: false,
        starRating_5: true
    },
    distanceFromBeach: {
        lessThan1Km: false,
        lessThan3Km: true,
        lessThan5Km: false
    },
    filteredApartments: []
};



export const apartmentsReducer = createReducer(
    initialState,
    on(
        apartmentsActions.loadApartmentsSuccess,
        (state, action): ApartmentsState => {
            return {
                ...state,
                apartments: action.apartments
            }
        }
    ),
    on(
        apartmentsActions.loadApartmentsFailure,
        (state, action): ApartmentsState => {
            return {
                ...state,
                error: action.error
            }
        }
    ),
    on(
        apartmentsActions.filterApartmentsByStars,
        (state, action): ApartmentsState => {
            console.log(action.starRating);
            
            return {
                ...state,
                starRating: action.starRating
            }
        }
    ),
    on(
        apartmentsActions.filterApartmentsByDistance,
        (state, action): ApartmentsState => {
            return {
                ...state,
                distanceFromBeach: action.distanceFromBeach
            }
        }
    )
);