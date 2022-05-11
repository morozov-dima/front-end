import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserData } from "./users.interface";

@Injectable()

export class UsersDataService {
    constructor(
        private http: HttpClient
    ) {}


    getUsersData(): Observable<UserData[]> {
        const url = '../../../assets/users-data.json';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            })
        };
        return this.http.get<UserData[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);           
        }

        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}