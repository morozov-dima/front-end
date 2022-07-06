// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************






// ************************* actions/index.ts **************************
import * as PhotosPageActions from './photos-page.actions';
import * as PhotosApiActions from './photos-api.actions';

export { PhotosPageActions, PhotosApiActions };






// ****************** actions/photos-api.actions.ts ********************

import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.interface';

export const loadPhotosSuccess = createAction(
  '[Photos Component] Load Photos Success',
  props<{photos: Photo[]}>()
);

export const loadPhotosFailure = createAction(
  '[Photos Component] Load Photos Failure',
  props<{error: string}>()
);

export const deletePhotoSuccess = createAction(
  '[Photos Page] Delete Photo Success',
  props<{id: number}>()
);

export const deletePhotoFailure = createAction(
  '[Photo Page] Delete Photo Failure',
  props<{error: string}>()
);






// ***************** actions/photos-page.actions.ts *******************
import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.interface';

export const loadPhotos = createAction(
  '[Photos Page] Load Photos'
);

export const deletePhoto = createAction(
  '[Photos Page] Delete Photo',
   props<{id: number}>()
);

export const updatePhoto = createAction(
  '[Photos Page] Update Photo',
  props<{ photo: Photo }>()
);

export const addPhoto = createAction(
  '[Photos Page] Add Photo',
  props<{ photo: Photo }>()
);


