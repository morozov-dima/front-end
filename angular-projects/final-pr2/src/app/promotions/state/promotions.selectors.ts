import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromotionState } from './promotions.interface';


const getPromotionFeatureState = createFeatureSelector<PromotionState>('promotions');

export const getPromotions = createSelector(
    getPromotionFeatureState,
    (state) => state.promotions
);