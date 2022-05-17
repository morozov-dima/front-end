import { createReducer, on } from "@ngrx/store";
import * as apartmentsActions from "./apartments-actions";
import { ApartmentsState } from "./apartments-interface";




const initialState: ApartmentsState = {
    apartments: [],
    error: ''
};



export const apartmentsReducer = createReducer(
    initialState,
    on(
        apartmentsActions.loadApartmentsSuccess,
        (state, action): ApartmentsState => {
            return {
                ...state,
                apartments: action.apartments,
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
       apartmentsActions.showAllApartments,
       (state): ApartmentsState => {
        return {
            ...state,
            apartments: state.apartments
        }  
       }
    )
);