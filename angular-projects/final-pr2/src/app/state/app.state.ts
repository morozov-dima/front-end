import { AuthState } from '../auth/state/auth.interface';
import { PromotionState } from '../promotions/state/promotions.interface';
import { UserState } from '../users/state/users.interface';

export interface State {
    promotions: PromotionState;
    users: UserState;
    auth: AuthState;
}