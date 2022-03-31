import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.interface";


// selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getShowUserName = createSelector(
    getUserFeatureState,
    state => state.showUserName
); 
