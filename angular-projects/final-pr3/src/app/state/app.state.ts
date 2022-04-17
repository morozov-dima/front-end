import { ActionReducerMap } from "@ngrx/store";
import { PromotionsState } from "../promotions/state/promotions.interface";
import * as fromPromotions from '../promotions/state/promotions.reducer';


export interface State {
    promotions: PromotionsState
}

export const appReducer: ActionReducerMap<State> = {
    promotions: fromPromotions.promotionsReducer
};