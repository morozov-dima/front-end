// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************



// ********************* state/actions.ts ********************

import { createAction, props } from '@ngrx/store';
import { User } from './users.interface';

export const loadUsers = createAction(
    '[Users Page] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users Page] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[Users Page] Load Users Failure',
    props<{ error: string }>()
);

export const showAllUsers = createAction(
    '[Users Page] Get All Users'
);

export const showUsersSortedByName = createAction(
    '[Users Page] Show Users Sorted By Name'
);

export const showUsersSortedByAge = createAction(
    '[Users Page] Show Users Sorted By Age'
);















// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************



// *************************** state/actions.ts *************************
import { createAction, props } from "@ngrx/store";
import { Apartment, StarRating, DistanceFromBeach } from './apartments-interface';

export const loadApartments = createAction(
    '[Apartments Page] Load Apartments'
);

export const loadApartmentsSuccess = createAction(
    '[Apartments Page] Load Apartments Success',
    props<{ apartments:Apartment[] }>()
);

export const loadApartmentsFailure = createAction(
    '[Apartments Page] Load Apartments Failure',
    props<{ error: string }>()
);


export const showAllApartments = createAction(
    '[Apartments Page] Show All Apartments'
);


export const filterApartmentsByStars = createAction(
    '[Apartments Page] Filter Apartments By Stars',
    props<{ starRating: StarRating }>()
);

export const filterApartmentsByDistance = createAction(
    '[Apartments Page] Filter Apartments By Distance',
    props<{ distanceFromBeach: DistanceFromBeach }>()
);


