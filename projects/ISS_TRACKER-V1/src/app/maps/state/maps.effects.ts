import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapPageActions, MapApiActions } from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MapsService } from './maps.service';
import { Store } from '@ngrx/store';
import { State } from '../../state/app.reducer';


@Injectable()
export class MapsEffects {
  constructor(
    private mapsService: MapsService,
    private actions$: Actions,
    private store: Store<State>
  ) {}




  loadMapsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MapPageActions.loadMaps),
      mergeMap(() =>
        this.mapsService.getMaps().pipe(
          map((ISSLocationFromAPI) =>
            MapApiActions.loadMapsSuccess({ ISSLocationFromAPI })
          ),
          catchError((error) => of(MapApiActions.loadMapsFailure({ error })))
        )
      )
    );
  });




  restoreLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MapPageActions.restoreData),
      map(() => {

          // set app location state. 
          // this.store.dispatch(
          //   MapPageActions.setInternalAppState({
          //     appLocationState: JSON.parse(
          //       localStorage.getItem('appLocationState') || '{}'
          //     ),
          //   })
          // );

          // locations saved by user (save button inside dialog popup)
          // this.store.dispatch(
          //   MapPageActions.saveLocation({
          //     updatedLocation: JSON.parse(
          //       localStorage.getItem('ISSLocationsSavedByUser') || '{}' 
          //     ),
          //   })
          // );


          // current active location  
          // this.store.dispatch(
          //   MapPageActions.currentActiveLocation({
          //     currentLocation: JSON.parse(
          //       localStorage.getItem('currentLocation') || '{}'
          //     ),
          //   })
          // );



          // locations histore saved by user
          // this.store.dispatch(
          //   MapPageActions.saveLocationsHistory({
          //     updatedLocation: JSON.parse(
          //       localStorage.getItem('ActiveLocationsHistory') || '{}'
          //     ),
          //   })
          // );




          return MapPageActions.restoreDataSuccess();
   



      })
    );
  });




}
