import { createReducer, on } from '@ngrx/store';
import { MapState } from './maps.interface';
import { MapApiActions, MapPageActions } from './actions';


const initialState: MapState = {
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

