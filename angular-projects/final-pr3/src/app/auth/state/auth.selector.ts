import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.interface";

export const featureKey = 'auth';


export const getAuthFeatureState = createFeatureSelector<AuthState>(featureKey);

export const getUser = createSelector(
    getAuthFeatureState,
    (state) => {
        return state.user
    }
);