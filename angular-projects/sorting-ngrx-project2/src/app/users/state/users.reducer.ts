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
    ),
    on(
      usersActions.showAllUsers,
      (state): UsersState => {
          return {
              ...state,
              // copy object (copy object 'users' to 'usersSorted')
              usersSorted: state.users.slice(0) 
          }
      }  
    ),
    on(
      usersActions.showUsersSortedByName,
      (state) : UsersState => {

           // create 'deep clone' of object
           let updatedUsers = state.users.slice(0);

           // here we use 'sort' array function, anf we pass arrow function as argument
           updatedUsers.sort((a:any, b:any) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                }

                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            }); 

           return {
              ...state,
              usersSorted: updatedUsers
          }
      } 
    ),
    on(
        usersActions.showUsersSortedByAge,
        (state) : UsersState => {

             // create 'deep clone' of object
            let updatedUsers = state.users.slice(0);
            updatedUsers.sort((a:any, b:any) => a.age - b.age);

            return {
                ...state,
                usersSorted: updatedUsers
            }
        }
    )
);