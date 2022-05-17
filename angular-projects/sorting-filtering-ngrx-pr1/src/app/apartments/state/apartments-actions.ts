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

export const sortApartmentsByPriceHighestFirst = createAction(
    '[Apartment Page] Sort Apartments By Price Highest First'
);

export const sortApartmentsByDistanceFromClosestBeach = createAction(
    '[Apartment Page] Sort Apartments By Distance From Closest Beach'
);

export const sortApartmentsByStarsHighestFirst = createAction(
    '[Apartment Page] Sort Apartments By Stars Highest First'
);


