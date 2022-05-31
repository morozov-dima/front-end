// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************


// ********************* apartments-service.ts *************************

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "./users.interface";

@Injectable()

export class UsersDataService {
    constructor(
        private http: HttpClient
    ) {}


     getUsers(): Observable<User[]> {
        const url = '../../../assets/json-file.json'; 
        return this.http.get<User[]>(url).pipe(
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















// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************


// ********************* apartments-service.ts *************************

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Apartment } from "./apartments-interface";

@Injectable()

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






