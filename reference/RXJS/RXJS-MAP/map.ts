// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ********************* apartments-service.ts *********************

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Apartment } from "./apartments-interface";

@Injectable({
  providedIn: 'root'
})

export class ApartmentsService {

    constructor(
        private http: HttpClient
    ) {}

    getApartments(): Observable<Apartment[]> {
        const url = '../../../assets/apartments-data.json';
        return this.http.get<Apartment[]>(url).pipe(
            map(
                (responseApartments) => {
                    // we will add id to our response
                    let updatedApartmentsResponse: Apartment[] = [];
                    let id: number = 1;
                    for (const responseApartment of responseApartments) {
                        console.log(responseApartment);
                        updatedApartmentsResponse.push({...responseApartment, id});
                        id++;
                    }
                    return updatedApartmentsResponse;
                }
            ),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.log('An error occured:', error.error);
        } else {
            console.log(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happend; please try again later.'));
     }   

}






// ************************** apartments-interface.ts ****************************
export interface ApartmentsState {
    apartments: Apartment[];
    error: string;
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
