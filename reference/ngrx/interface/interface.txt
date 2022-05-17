// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************


// ************************ state/interface.ts *************************

export interface UsersState {
    users: User[];
    usersSorted: User[];
    error: string;
    userType: string;
}


export interface User {
    id: number;
    name: string;
    age: string;
    email: string;
    phoneNumber: string;
}













// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************

// ********************** apartments-interface.ts ***********************

export interface ApartmentsState {
    apartments: Apartment[];
    error: string;
    starRating: StarRating;
    distanceFromBeach: DistanceFromBeach;
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