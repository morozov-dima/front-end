// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************


// *************************** maps.reducer.ts **************************
import { createReducer, on } from '@ngrx/store';
import { MapState } from './maps.interface';
import { MapApiActions, MapPageActions } from './actions';


export const initialState: MapState = {
     appLocationState: 1,
     ISSLocationSavedByUser: [],
     ISSLocationFromAPI: null,
     currentLocation: null,
     error: ''    
};


export const mapReducer = createReducer<MapState>(
    initialState,
    on(
        MapApiActions.loadMapsSuccess,
        (state, action) : MapState => {
            return {
                ...state,
                ISSLocationFromAPI: action.ISSLocationFromAPI
            }
        }
    ),
    on(
        MapApiActions.loadMapsFailure,
        (state, action): MapState => {
            return {
                ...state,
                error: action.error
            }
        }
    ),
    on(
        MapPageActions.setCurrentLocation,
        (state, action): MapState => {
            return {
                ...state,
                ISSLocationFromAPI: action.ISSLocationFromAPI
            }
        }
    ),
    on(
        MapPageActions.deleteLocation,
        (state, action): MapState => {
            return {
                ...state,
                ISSLocationSavedByUser: state.ISSLocationSavedByUser?.filter(
                    (location) => {
                       return location.id !== action.id
                    }
                )
            }
        }
    ),
    on(
        MapPageActions.saveLocation,
        (state, action): MapState => {
            const ISSLocationSavedByUser = state.ISSLocationSavedByUser.slice(0);
            ISSLocationSavedByUser.push(action.updatedLocation);
              return {
                ...state,
               ISSLocationSavedByUser: ISSLocationSavedByUser 
            }
        }
    ),
    on(
        MapPageActions.saveRestoredLocations,
        (state, action): MapState => {
              return {
                ...state,
               ISSLocationSavedByUser: action.restoredLocations 
            }
        }
    ),
    on(
        MapPageActions.currentActiveLocation,
        (state, action): MapState => {
              return {
                ...state,
                currentLocation: action.currentLocation
            }
        }
    ),
    on(
        MapPageActions.setInternalAppState,
        (state, action): MapState => {
              return {
                ...state,
                appLocationState: action.appLocationState
            }
        }
    )


);







// *************************** maps.interface.ts **************************

export interface MapState {
    appLocationState: number;
    ISSLocationSavedByUser: ISSLocationSavedByUser[];
    ISSLocationFromAPI: ISSLocationFromAPI | null;
    currentLocation: ISSLocationFromAPI | null;
    error: string;
}

export interface ISSLocationSavedByUser {
    iss_position: {
        longitude: string;
        latitude: string;
    },
    timestamp: string;
    name: string;
    id: number;
    isLocationSelected: boolean;
}

export interface ISSLocationFromAPI {
    iss_position: {
        longitude: string;
        latitude: string;
    },
    timestamp: string;
    message?: string;
}










// *************************** maps.reducer.spec.ts **************************
import * as fromReducer from './maps.reducer';
import { MapPageActions } from './actions/index';
import { MapState } from './maps.interface';

describe('Maps Reducer', () => {


    describe('unknown action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const action = {
            type: 'Unknown',
            };
            const state = fromReducer.mapReducer(initialState, action);
        
            expect(state).toBe(initialState);
        });
    });


  describe('deleteLocation action', () => {
    it('should delete current location', () => {
      const { initialState } = fromReducer;

      const newState: MapState = {
        appLocationState: 1,
        ISSLocationSavedByUser: [
            {
                iss_position: {
                    longitude: '222.33',
                    latitude: '666.77',
                },
                timestamp: '343432435454',
                name: 'some name 44',
                id: 4,
                isLocationSelected: false 
            }
        ],
        ISSLocationFromAPI:  null,
        currentLocation:  null,
        error: ''
    };

      const action = MapPageActions.deleteLocation({ id: 4 });
      const state = fromReducer.mapReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(newState);
    });
  });






  describe('set Internal AppState', () => {
    it('should update app internal state', () => {
        const { initialState } = fromReducer;
        
        console.log(initialState);
        
        const newState: MapState = {
            appLocationState: 2,
            ISSLocationSavedByUser: [],
            ISSLocationFromAPI:  null,
            currentLocation:  null,
            error: ''
        };
        console.log(newState);
        
        const action = MapPageActions.setInternalAppState({appLocationState: 2});   
        const state = fromReducer.mapReducer(initialState, action);
        console.log(state);
        
        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
    });
  });


});







// *************************** actions/index.ts **************************
import * as MapPageActions from './map-page.actions';
import * as MapApiActions from './map-api.actions';

export { MapPageActions, MapApiActions };








// *********************** actions/map-page.actions.ts ********************
import { createAction, props } from '@ngrx/store';
import { ISSLocationFromAPI, ISSLocationSavedByUser } from '../maps.interface';

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

export const saveRestoredLocations = createAction(
  '[Maps Page] Save Restored Location',
  props<{ restoredLocations: ISSLocationSavedByUser[] }>()
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




