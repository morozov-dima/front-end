// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************



// ************************** maps.interface.ts *************************

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






// ************************** maps.selectors.ts ************************
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './maps.interface';

const getMapFeatureState = createFeatureSelector<MapState>('maps');

export const getISSLocationSavedByUser = createSelector(
    getMapFeatureState,
    state => {
        return state.ISSLocationSavedByUser
    }
);







// *********************** maps.selectors.spec.ts ************************
import { getISSLocationSavedByUser } from "./maps.selectors";
import { MapState } from './maps.interface';

describe("Maps Selectors", () => {
    
  const initialState: MapState = {
    appLocationState: 1,
        ISSLocationSavedByUser: [
        {
            iss_position: {
                longitude: '222.33',
                latitude: '666.77',
            },
            timestamp: '343432435454',
            name: 'some name 4',
            id: 1,
            isLocationSelected: false 
        }
    ],
    ISSLocationFromAPI:  null,
    currentLocation:  null,
    error: ''
  };

  

  it("should select the book list", () => {
    //console.log(initialState.ISSLocationSavedByUser);
    const result = getISSLocationSavedByUser.projector(
        initialState,
        initialState.ISSLocationSavedByUser
    );
    //console.log(result);
    
    
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });


});