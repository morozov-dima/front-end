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
        return state.filteredApartments;
    }
);


export const selectFilteredApartments = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.filteredApartments;
    }
);


export const selectApartmentsByDistanceFromClosestBeach = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.filteredApartments;
    }
);



export const selectApartmentsByStarsHighestFirst = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.filteredApartments;
    }
);

