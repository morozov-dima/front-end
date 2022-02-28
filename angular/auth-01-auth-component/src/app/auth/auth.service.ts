import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

// This is good practice in angular to define the
// type of data you're working with.
import { AuthResponseData } from "./authResponseData";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {




    // *************** Subject *******************
    // we create 'Subject' where we will store user data
    // we will use 'subject' in order to pass data between components.
    // we manage our user with 'subject'
    // we will use different type of 'Subject' witch is called 'BehaviorSubject' 
    user = new BehaviorSubject<User>(null);
    // *************** Subject *******************





    constructor(
        private http: HttpClient,
        private router: Router ) {}





    // signup method (register) - send Http request
    // this method should send request to the sign up URL.
    signup(email: string, password: string) {
        // according to Firebase API we need sens POST request to attached in documentation URL.
        // link to documentation : 
        // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        //
        // you can find this API key in Firebase panel: Go to 'Project Overview' -> 'Projet settings'
        // and in 'Web API Key' you can see this key.

        // API KEY from firebase panel
        const apiKey = 'AIzaSyAicmLY0SSVqbnJJFDrJrWUW3if4ngn2_8';
        // url where we need send request
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

        // according to Firebase API we need send email, password and returnSecureToken
        // posts<T> are generic method, and we can set type of data we get back.
        // in our case we get back <AuthResponseData> according to our interface
        return this.http.post<AuthResponseData>(
            // first parameter is url that we send to server.
            url,
            // second parameter is data that we send to server.
            {
                email: email,
                password: password,
                // should be 'true' according to Firebase API.
                returnSecureToken: true
            }
        ).pipe(
                // catch error. we will execure 'handleError' private method.
                catchError(this.handleError),
                // 'tap' operator allows us to perform some action without changing the response.
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expireIn
                    );
                })

            )
    }



    








    // login method - send Http request
    //
    // according to Firebase API we need send request to this URL
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
    //
    // accorduing to API firebase documentation we need use POST method
    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    login(email: string, password: string) {
        // API KEY from firebase panel
        const apiKey = 'AIzaSyAicmLY0SSVqbnJJFDrJrWUW3if4ngn2_8';
        // url where we need send our request
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        return this.http.post<AuthResponseData>(
            // first parameter is url where we send our request
            url , 
            // current parameters according to Firebase API
            {
                email: email,
                password: password,
                // we need set 'returnSecureToken' to true according to firebase API
                returnSecureToken: true
            }
        ).pipe(
            // catch error. we will execure 'handleError' private method.
            catchError(
                this.handleError),
                // 'tap' operator allows us to perform some action without changing the response.
                tap(
                    resData => {
                        this.handleAuthentication(
                            resData.email,
                            resData.localId,
                            resData.idToken,
                            +resData.expireIn
                        );
                    }
                )
         );

    }



    // logout method
    logout() {
       this.user.next(null); 
       // redirect to '/auth' page when user logout
       this.router.navigate(['/auth']);
    }




    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        // number of seconds in which the ID token expires.
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        // we pass data to the 'User' class constaructor.
        // this way we can store data.
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        // now we can use our 'Subject' to set/emit this data
        // we use 'next' method in order to emit data.
        this.user.next(user);
    }









    // handleError method
    private handleError(errorRes: HttpErrorResponse) {
        // default message
        let errorMessage = 'An unknown error occurred!';
        if(errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        // 'error.error.message' this is reaponse stracture that
        // we get from server.
        switch (errorRes.error.error.message) {
            // when we get from server 'EMAIL_EXISTS' message
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';  
            break;
            
            // when we get from server 'EMAIL_NOT_FOUND' message
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
            break;    

            // when we get from server 'INVALID_PASSWORD' message
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
            break;   
        }
        return throwError(errorMessage);
    }









}