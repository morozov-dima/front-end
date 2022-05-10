import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UsersList } from "./users-interface";


@Injectable({
    providedIn: 'root'
})

export class UsersDataService {

    constructor(
        private http: HttpClient
    ) {}


    getUsers(): Observable<UsersList[]> {
        const url = '../../assets/users-data.json';
        return this.http.get<UsersList[]>(url).pipe(
            catchError(this.handleError)
        );
    }
    

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(`Backend return code ${error.status}, body was:`, error.error);
        }
        return throwError(() => new Error('Something bad happend; please try again later.'));
    }

}