import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Apartment, ApartmentsState } from "./apartments-interface";

const selectApartmentsFeatureState = createFeatureSelector<ApartmentsState>('apartments');

export const selectAllApartments = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        return state.apartments
    }
);


export const selectApartmentsSortedByStarsHighestFirst = createSelector(
    selectApartmentsFeatureState,
    (state) => {
        let updatedApartment: Apartment[] = [];
        updatedApartment = state.apartments.slice(0);
        updatedApartment.sort((a: any, b: any) => a.price - b.price);
        return updatedApartment;
    }
);


