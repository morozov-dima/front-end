
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
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }  


}






// ************************** apartments-interface.ts ****************************
export interface Apartment {
    id?: number; // optional
    name: string;
    reviewScore: number;
    starRating: number;
    price: number;
    freeCancellation: boolean;
    distanceFromClosestBeach : number;
}


