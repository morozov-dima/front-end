// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************


import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.interface';


const selectUsersFeatureState = createFeatureSelector<UsersState>('users');



export const selectAllUsers = createSelector(
    selectUsersFeatureState,
    state => state.users
);


export const selectSortedUsers = createSelector(
    selectUsersFeatureState,
    (state) => {
       return state.usersSorted;
    }
);


export const selectUsersByAge = createSelector(
    selectUsersFeatureState,
    (state) => {
        let updatedUsers = state.users.slice(0);
        updatedUsers.sort((a: any, b:any) => a.age - b.age);
        return updatedUsers;
    }
);


export const selectUsersByName = createSelector(
    selectUsersFeatureState,
    (state) => {
        let updatedUser = state.users.slice(0);
        updatedUser.sort((a:any, b:any) => {
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

        return updatedUser;
    }
);















// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************


// ************ app/users/state/users.selectors.ts  *************
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { find } from 'rxjs';
import { UsersState } from './users.interface';
import { User } from './users.interface';

const getUserFeatureState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(
  getUserFeatureState,
  (state) => state.users
);

export const toggleUserCode = createSelector(
  getUserFeatureState,
  (state) => state.showCode
);

export const getCurrentUserId = createSelector(getUserFeatureState, (state) => {
  return state.currentUserId;
});

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state, currentUserId) => {
    //console.log(state);
    //console.log(currentUserId);
    return currentUserId
      ? state.users.find((p) => p.id === currentUserId)
      : null;
  }
);













// **********************************************************************
// **************************** Example 3 *******************************
// **********************************************************************

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.interface';

const selectUsersFeatureState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
    selectUsersFeatureState,
    (state) => {
        return state.users
    }
);

export const selectSelectedTabName = createSelector(
    selectUsersFeatureState,
    (state) => {
        return state.selectedTabName
    }
);


export const selectUsersByType = createSelector(
    selectUsersFeatureState,
    selectSelectedTabName,
    (state, selectedTabName) => {
        // console.log(state);
        // console.log(selectedTabName);
        if(selectedTabName === 'all') {
            return state.users;
        } else {
            return state.users.filter((data) => {return data.type === selectedTabName});
        }
        
    }
);












// **********************************************************************
// **************************** Example 4 *******************************
// **********************************************************************


// ************************ apartments-selectors.ts *********************

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Apartment, ApartmentsState } from "./apartments-interface";

const selectApartmentsFeatureState = createFeatureSelector<ApartmentsState>('apartments');

export const selectAllApartments = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.apartments
    }
);



export const selectApartmentsByPriceHighestFirst = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        let updatedApartment: Apartment[] = [];
        updatedApartment = state.apartments.slice(0);
        updatedApartment.sort((a: any, b: any) => b.price -a.price);
        return updatedApartment;
    }
);




export const selectUsersByDistanceFromClosestBeach = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        let updatedApartment: Apartment[] = [];
        updatedApartment = state.apartments.slice(0);
        updatedApartment.sort((a: any, b: any) => a.distanceFromClosestBeach - b.distanceFromClosestBeach);
        return updatedApartment;
    }
);



export const selectApartmentsByStarsHighestFirst = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        let updatedApartment: Apartment[] = [];
        updatedApartment = state.apartments.slice(0);
        updatedApartment.sort((a: any, b: any) => a.price - b.price);
        return updatedApartment;
    }
);


export const selectApartmentsStarRating = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.starRating
    }
);




export const selectApartmentsDistance = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.distanceFromBeach
    }
);









// **********************************************************************
// **************************** Example 5 *******************************
// **********************************************************************

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './app.state';
import { Item } from './items.interface';
 
export const selectItemsFeatureState = createFeatureSelector<State>('results');

export const selectFilterQuery = createSelector(
    selectItemsFeatureState,
    state => state.filterQuery
);


export const changeSortedDirection = createSelector(
    selectItemsFeatureState,
    state => state.sortedDirection
);


export const selectGridData = createSelector(
    selectItemsFeatureState,
    state => state.gridData
);
    

export const selectItems = createSelector(
    selectItemsFeatureState,
    changeSortedDirection,
    selectFilterQuery,
     (state, sortedDirection, filterQuery) => {

        let filteredData = [...state.items];
        
        if (filterQuery !== '') {
            filteredData = filteredData
                .filter((item) =>  {
                    const updaedItem = item['Year'].toLowerCase().includes(filterQuery) || item['Title'].toLowerCase().includes(filterQuery);
                    return updaedItem;
                }
            );
        }

        const sortedData = [...filteredData];
        sortedData.sort(function (x: any, y: any) {
            let paramA = x.Title.toUpperCase();
            let paramB = y.Title.toUpperCase();
            return compare(paramA, paramB, sortedDirection);
        });
       return sortedData;
    }
); 


export const selectView = createSelector(
    selectItemsFeatureState,
    state => state.view
);
    

export const selectError = createSelector(
    selectItemsFeatureState,
    state => state.error
);


export const selectItemById = (id: number) => createSelector(
    selectItemsFeatureState,
    state => {
       const currentItem: Item[] = state.items.filter(item => item.id === id);

        return currentItem;

    }
);


// Utils
export function compare(a: any, b: any, sortDirection: string): number {
    if (a > b) {
        return sortDirection === 'asc' ? 1 : -1;
    }
    if(a < b) {
        return sortDirection === 'desc' ? 1 : -1;
    }
    return 0;
}

