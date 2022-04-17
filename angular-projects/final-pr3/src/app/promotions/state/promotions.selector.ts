import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PromotionsState } from "./promotions.interface";



export const getPromotionsFeatureState = createFeatureSelector<PromotionsState>('promotions');

export const getPosts = createSelector(
    getPromotionsFeatureState,
    (state) => {
        return state.posts
    }
);