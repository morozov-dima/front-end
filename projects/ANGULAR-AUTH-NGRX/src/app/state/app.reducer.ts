import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../auth/state/auth.interface';
import { PromotionState } from '../promotions/state/promotions.interface';
import { UserState } from '../users/state/users.interface';

import * as fromAuth from '../auth/state/auth.reducer';
import * as fromPromotions from '../promotions/state/promotions.reducer';
import * as fromUsers from '../users/state/users.reducer';


export interface State {
    promotions: PromotionState;
    users: UserState;
    auth: AuthState;
}





export const appReducer: ActionReducerMap<State> = {
    users: fromUsers.userReducer,
    auth: fromAuth.authReducer,
    promotions: fromPromotions.promotionReducer
  };