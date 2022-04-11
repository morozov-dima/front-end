import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromotionState } from './promotions.interface';


const getPromotionFeatureState = createFeatureSelector<PromotionState>('promotions');

export const getPromotions = createSelector(
    getPromotionFeatureState,
    (state) => {
       // console.log(state);
        console.log(state.promotions);
        
        return state.promotions
    }
);