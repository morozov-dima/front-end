// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************


// ********************* state/users.effect.ts *************************

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { MoviesService } from './photos.service';
import { PhotosApiActions, PhotosPageActions } from './actions';
 
@Injectable()
export class PhotosEffects {
 
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosPageActions.loadPhotos),
      concatMap(() => this.moviesService.getPhotos()
        .pipe(
          map(photos => PhotosApiActions.loadPhotosSuccess({photos})),
          catchError((error) => of( PhotosApiActions.loadPhotosFailure({error}) ))
        )
      )
    )
  );



  deletePhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosPageActions.deletePhoto),
      mergeMap(action => this.moviesService.deletePhoto(action.id)
        .pipe(
          map(() => PhotosApiActions.deletePhotoSuccess({id: action.id})),
          catchError((error) => of( PhotosApiActions.loadPhotosFailure({error: error}) ))
        )
      )
    )
  );


 
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}