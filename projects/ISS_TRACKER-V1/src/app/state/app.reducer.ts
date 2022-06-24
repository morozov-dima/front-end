import { ActionReducerMap } from '@ngrx/store';
import { MapState } from '../maps/state/maps.interface';
import * as fromMaps from '../maps/state/maps.reducer';

export interface State {
    maps: MapState;
}

export const appReducer: ActionReducerMap<State> = {
    maps: fromMaps.mapReducer
};