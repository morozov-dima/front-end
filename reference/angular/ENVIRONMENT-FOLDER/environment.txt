

// Example 1:
// ************* src/environments/environment.prod.ts **************

// this file for LIVE
export const environment = {
  production: true,

  // you can store your API key here
  // this code will be used for 'production'
  firebaseAPIKey: 'AIzaSyAicmLY0SSVqbnJJFDrJrWUW3if4ngn2_8'
};









// ************* src/environments/environment.ts **************
//
// This file can be replaced during build by using the 'fileReplacements' array.
// 'ng build --prod' replaces 'environment.ts' with 'environment.prod.ts'.
// The list of file replacements can be found in 'angular.json'.


// this file for DEV mode
export const environment = {
  production: false,

  // you can store your API key here
  // this code will be used for DEV mode.
  firebaseAPIKey: 'AIzaSyAicmLY0SSVqbnJJFDrJrWUW3if4ngn2_8'
};









// ************* app/auth/auth.service.ts **************
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "./authResponseData";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor( private http: HttpClient ) {}

    signup(email: string, password: string) {
        const apiKey = environment.firebaseAPIKey;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        return this.http.post<AuthResponseData>(
            url,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            )
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