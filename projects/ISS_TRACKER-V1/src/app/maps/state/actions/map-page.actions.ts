import { createAction, props } from '@ngrx/store';
import {
  ISSLocationFromAPI,
  ISSLocationSavedByUser
} from '../maps.interface';

export const loadMaps = createAction('[Maps page] Load Maps');

export const setCurrentLocation = createAction(
  '[Maps page] Set CurrentLocation',
  props<{ ISSLocationFromAPI: ISSLocationFromAPI }>()
);


export const deleteLocation = createAction(
  '[Maps Page] Delete Location',
  props<{ id: number }>()
);

export const saveLocation = createAction(
  '[Maps Page] Save Location',
  props<{ updatedLocation: ISSLocationSavedByUser }>()
);

export const currentActiveLocation = createAction(
  '[Maps Page] Set Current Active Location',
  props<{ currentLocation: ISSLocationFromAPI }>()
);

export const setInternalAppState = createAction(
  '[Maps Page] Set Internal App State',
  props<{ appLocationState: number }>()
);

export const restoreData = createAction('[Maps page] Restore Locations');

export const restoreDataSuccess = createAction(
  '[Maps page] Restore Locations Success'
);


export const saveLocationsHistory = createAction(
  '[Maps Page] Save Location History',
  props<{ updatedLocation: ISSLocationSavedByUser }>()
);