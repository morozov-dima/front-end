import { createAction, props } from '@ngrx/store';
import { Promotion } from '../promotions.interface';

export const loadPromotionsSuccess = createAction(
  '[Promotions page] Load Success',
  props<{ promotions: Promotion[] }>()
);

export const loadPromotionsFailure = createAction(
  '[Promotions Page] Load Failure',
  props<{ error: string }>()
);
