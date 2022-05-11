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