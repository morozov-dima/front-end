import { createReducer, on } from '@ngrx/store';
import { PromotionState } from './promotions.interface';
import { PromotionApiActions, PromotionPageActions } from './actions';


const initialState: PromotionState = {
    promotions: [],
    error: ''    
};



export const promotionReducer = createReducer<PromotionState>(
    initialState,
    on(
        PromotionApiActions.loadPromotionsSuccess,
        (state, action) : PromotionState => {
            return {
                ...state,
                promotions: action.promotions,
                error: ''
            }
        }

    ),
    on(
        PromotionApiActions.loadPromotionsFailure,
        (state, action): PromotionState => {
            return {
                ...state,
                promotions: [],
                error: action.error
            }
        }

    )
);

