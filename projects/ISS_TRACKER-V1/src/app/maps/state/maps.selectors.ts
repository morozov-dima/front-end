import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './maps.interface';

const getMapFeatureState = createFeatureSelector<MapState>('maps');

// export const getSelectedTab = createSelector(
//     getMapFeatureState,
//     state => {
//         return state.selectedTab
//     }
// );


export const getISSLocationFromAPI = createSelector(
    getMapFeatureState,
    state => {
        return state.ISSLocationFromAPI
    }
);


export const getISSLocationSavedByUser = createSelector(
    getMapFeatureState,
    state => {
        return state.ISSLocationSavedByUser
    }
);


export const getcurrentActiveLocation = createSelector(
    getMapFeatureState,
    state => {
        return state.currentLocation
    }
);


export const getAppLocationState = createSelector(
    getMapFeatureState,
    state => {
        return state.appLocationState
    }
);



export const getActiveLocationsHistory = createSelector(
    getMapFeatureState,
    state => {
        return state.ActiveLocationsHistory
    }
);