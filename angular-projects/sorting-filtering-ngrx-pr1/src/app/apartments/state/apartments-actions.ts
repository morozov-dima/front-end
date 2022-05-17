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


export const filterApartmentsByDistance = createAction(
    '[Apartments Page] Filter Apartments By Distance',
    props<{ distanceFromBeach: DistanceFromBeach }>()
);


