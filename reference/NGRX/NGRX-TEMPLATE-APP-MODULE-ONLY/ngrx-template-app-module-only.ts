// **********************************************************************
// ****************************** Example *******************************
// **********************************************************************


// **************************** app.module.ts ***************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';

import { photosReducer } from './state/photos.reducer';
import { MovieEffects } from './state/photos.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({photos: photosReducer}),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






// **************************** app.component.ts ***************************
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotosPageActions from './state/photos.actions';
import { Photo } from './state/photos.interface';
import { selectPhotos } from './state/photos.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  photos$: Observable<Photo[]> | null = null;

  ngOnInit(): void {
    // load photos from back-end
    this.store.dispatch(PhotosPageActions.loadPhotos());

    this.photos$ = this.store.select(selectPhotos);
  }

}





// ************************** app.component.html *************************
<section>
  <ul>
    <li *ngFor="let photo of (photos$ | async)">
      {{photo.title}}
    </li>
  </ul>
</section>








// ************************** state/app.state.ts *************************
import { Photo } from "./photos.interface";


export interface State {
    listOfPhotos: Photo[]
    error: string;
}






// ************************ state/photos.actions.ts ***********************
import { createAction, props } from '@ngrx/store';
import { Photo } from './photos.interface';

export const loadPhotosSuccess = createAction(
    '[Photos Component] Load Photos Success',
    props<{photos: Photo[]}>()
);

export const loadPhotosFailure = createAction(
    '[Photos Component] Load Photos Failure',
    props<{error: string}>()
);

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







// ************************ state/photos.effect.ts ***********************
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MoviesService } from './photos.service';
import * as PhotosPageActions from './photos.actions';
 
@Injectable()
export class MovieEffects {
 
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosPageActions.loadPhotos),
      mergeMap(() => this.moviesService.getPhotos()
        .pipe(
          map(photos => PhotosPageActions.loadPhotosSuccess({photos})),
          catchError(() => of( PhotosPageActions.loadPhotosFailure ))
        )
      )
    )
  );
 
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}







// *********************** state/photos.interface.ts **********************
export interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string;
}





// *********************** state/photos.reducer.ts ***********************
import { createReducer, on } from '@ngrx/store';
import { State } from './app.state';
import * as PhotosPageActions from './photos.actions';


export const initialState: State = {
    listOfPhotos: [],
    error: ''
};

export const photosReducer = createReducer(
  initialState,
  on(
    PhotosPageActions.loadPhotosSuccess,
    (state, action) => ({
      ...state,
      listOfPhotos: action.photos
    })
  ),
  on(
    PhotosPageActions.loadPhotosFailure,
    (state, action) => ({
      ...state,
      error: action.error
    })
  )
);








// *********************** state/photos.selector.ts ***********************
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './app.state';
 
export const selectPhotosFeatureState = createFeatureSelector<State>('photos');

export const selectPhotos = createSelector(
    selectPhotosFeatureState,
    state => state.listOfPhotos
); 






// *********************** state/photos.service.ts ***********************
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Photo } from "./photos.interface";

@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {
    constructor (private http: HttpClient) {}
  
    getPhotos(): Observable<Photo[]> {
        const url = 'https://jsonplaceholder.typicode.com/photos';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8'
            })
         };

      return this.http.get<Photo[]>(url, httpOptions);
    }
  }







  // *********************** CLI ***********************

  /*
   *  npm install @ngrx/store --save
   *  npm install @ngrx/effects --save
   *  npm install @ngrx/store-devtools --save
   *  npm install @ngrx/router-store --save
   * 
  */