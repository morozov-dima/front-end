
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






