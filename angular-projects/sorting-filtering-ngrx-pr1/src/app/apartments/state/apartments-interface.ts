export interface ApartmentsState {
    apartments: Apartment[];
    error: string;
    filteredApartments: Apartment[]
}

export interface Apartment {
    id?: number;
    name: string;
    reviewScore: number;
    starRating: number;
    price: number;
    freeCancellation: boolean;
    distanceFromClosestBeach : number;
}


export interface StarRating {
    starRating_1: boolean;
    starRating_2: boolean;
    starRating_3: boolean;
    starRating_4: boolean;
    starRating_5: boolean;
}


export interface DistanceFromBeach {
    lessThan1Km: boolean;
    lessThan3Km: boolean;
    lessThan5Km: boolean;
}