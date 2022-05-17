import { createReducer, on } from "@ngrx/store";
import * as apartmentsActions from "./apartments-actions";
import { Apartment, ApartmentsState } from "./apartments-interface";




const initialState: ApartmentsState = {
    apartments: [],
    error: '',
    filteredApartments: []
};



export const apartmentsReducer = createReducer(
    initialState,
    on(
        apartmentsActions.loadApartmentsSuccess,
        (state, action): ApartmentsState => {
            return {
                ...state,
                apartments: action.apartments,
                filteredApartments: action.apartments
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
            let updatedApartments: Apartment[] = []; 
            let curentStarRating: any = action.starRating // copy object
            
            for (const property in curentStarRating) {
                if (curentStarRating[property]) {
    
                    let lastCharIndex = property.indexOf('_');
                    let lastChar = parseInt(property.substring(lastCharIndex + 1));
    
                    for (const apartment of state.apartments) {
                        if (apartment.starRating === lastChar) {
                            updatedApartments.push(apartment);
                        }
                    }
                }
            }
            return {
                ...state,
                filteredApartments: updatedApartments
            }
        }
    ),
    on(
        apartmentsActions.sortApartmentsByPriceHighestFirst,
        (state): ApartmentsState => {
            console.log(state);
            let updatedApartment: Apartment[] = [];
            updatedApartment = state.filteredApartments.slice(0);
            updatedApartment.sort((a: any, b: any) => b.price - a.price);
            
            return {
                ...state,
                filteredApartments: updatedApartment
            }
        }
    ),
    on(
        apartmentsActions.sortApartmentsByDistanceFromClosestBeach,
        (state): ApartmentsState => {
            let updatedApartment: Apartment[] = [];
            updatedApartment = state.filteredApartments.slice(0);
            updatedApartment.sort((a: any, b: any) => a.distanceFromClosestBeach - b.distanceFromClosestBeach);
            return {
                ...state,
                filteredApartments: updatedApartment
            }
        }
    ),
    on(
        apartmentsActions.sortApartmentsByStarsHighestFirst,
        (state): ApartmentsState => {
            let updatedApartment: Apartment[] = [];
            updatedApartment = state.filteredApartments.slice(0);
            updatedApartment.sort((a: any, b: any) => a.price - b.price);
            return {
                ...state,
                filteredApartments: updatedApartment
            }
        }
    ),
    on(
       apartmentsActions.showAllApartments,
       (state): ApartmentsState => {
        return {
            ...state,
            filteredApartments: state.apartments
        }  
       }
    )
);