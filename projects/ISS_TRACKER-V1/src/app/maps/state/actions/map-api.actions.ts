import { createAction, props } from '@ngrx/store';
import { ISSLocationFromAPI } from '../maps.interface';

export const loadMapsSuccess = createAction(
  "[Maps page] Load Maps Success",
  props<{ ISSLocationFromAPI: ISSLocationFromAPI }>()
);

export const loadMapsFailure = createAction(
  "[Maps Page] Load Maps Failure",
  props<{ error: string }>()
);


