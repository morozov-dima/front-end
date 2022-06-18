import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs";
import { HandleErrorService } from "src/app/shared/error/error.service";
import { environment } from 'src/environments/environment';
import { User } from "./auth-user.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State } from "src/app/state/app.reducer";
import { AuthApiActions, AuthPageActions } from "./actions";
import { AuthResponseData } from "./auth.interface";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

        private tokenExpirationTimer: any;

        constructor(
            private http: HttpClient,
            private handleErrorService: HandleErrorService,
            private router: Router,
            private store: Store<State> 
            ) {}



        login(email: string, password: string) {
            // const that declared in environment folder.
            const apiKey = environment.apiKey;
            const url = `https://jsonplaceholder.typicode.com/posts?${apiKey}&a=1`;
            return this.http.post<any>(url, 
                {
                    email: email,
                    password: password,
                    // we need set 'returnSecureToken' to true according to firebase API.
                    returnSecureToken: true
                }
            ).pipe(
                tap(() => {
                        // in case of real server we get 'expiresIn' from response
                        // and instead of 300000 we will write '+resData.expireIn * 1000'
                        // where 'resData.expireIn' is data the we get from server.
                        // 5 min = 300000 milisec 
                        // 1 min = 60000 millisec
                        
                        // 1 sec = 1000 millisec
                        this.setLogoutTimer(600000) 
                        //this.setLogoutTimer(600000) // logout aftert 60 min
                    }
                ),
                map(() => {
                // 1. here we will emulate server response.
                //    this is response that we will get from real server.
                // 2. with real back-end server we will get this response
                //    (that include token) from server.
                const authResponseData: AuthResponseData = {
                    idToken: 'FDGFGGFFHHGJHJKFG34343DFDFGFDHFGFDGSDFSADSAFGFHGJHJKHG',
                    email: 'md123@gmail.com',
                    expiresIn: 300, // 300 milliseconds
                    userId: '10200'
                };

                const expirationDate = new Date(new Date().getTime() + authResponseData.expiresIn * 1000);
                // 1. create instance of new user.
                // 2. we pass data to the 'User' class constaructor.
                //    this way we can store data.
                const user = new User(
                    authResponseData.email,
                    authResponseData.userId,
                    authResponseData.idToken,
                    expirationDate
                );


                this.handleAuthentication(
                        authResponseData.idToken,
                        authResponseData.email,
                        authResponseData.expiresIn,
                        authResponseData.userId
                        );
                        
                // return updated response        
                return user;
                        
                }),
                catchError(this.handleErrorService.handleError)
                );
        }



        logout() {
            this.clearLogoutTimer();
            // remove data from localStorage
            localStorage.removeItem('userData');
            // redirect to '/auth' page
            this.router.navigate(['/auth']);
        }



        setLogoutTimer(expirationDuration: number) {
            this.tokenExpirationTimer = setTimeout(() => {
               // call logout action 
               console.log('logout ...');
               this.store.dispatch(AuthPageActions.Logout()); 
            }, expirationDuration);
        }




        clearLogoutTimer() {
            console.log('Inside clearLogoutTimer ...');
            if (this.tokenExpirationTimer) {
                clearTimeout(this.tokenExpirationTimer);
                this.tokenExpirationTimer = null;
            }
        }



        // register new user
        signup(email: string, password: string) {
            // const that declared in environment folder.
            const apiKey = environment.apiKey;
            const url = `https://jsonplaceholder.typicode.com/posts?${apiKey}`;
            return this.http.post<any>(url, 
                {
                    email: email,
                    password: password,
                    // we need set 'returnSecureToken' to true according to firebase API.
                    returnSecureToken: true
                }
            ).pipe(
                tap(() => {
                        // in case of real server we get 'expiresIn' from response
                        // and instead of 300000 we will write '+resData.expireIn * 1000'
                        // where 'resData.expireIn' is data the we get from server.
                        // 5 min = 300000 milisec 
                        // 1 min = 60000 millisec
                        // 1 sec = 1000 millisec
                        this.setLogoutTimer(600000) // logout aftert 1 min 
                        //this.setLogoutTimer(600000) // logout aftert 60 min
                    }
                ),
                map(() => {
                // 1. here we will emulate server response.
                //    this is response that we will get from real server.
                // 2. with real back-end server we will get this response
                //    (that include token) from server.
                const authResponseData: AuthResponseData = {
                    idToken: 'FDGFGGFFHHGJHJKFG34343DFDFGFDHFGFDGSDFSADDDDDDDDDDDDDD',
                    email: 'new-signup-user@gmail.com',
                    expiresIn: 300, // 300 milliseconds
                    userId: '10111'
                };
                
                
                const expirationDate = new Date(new Date().getTime() + authResponseData.expiresIn * 1000);
                // 1. create instance of new user.
                // 2. we pass data to the 'User' class constaructor.
                //    this way we can store data.
                const user = new User(
                    authResponseData.email,
                    authResponseData.userId,
                    authResponseData.idToken,
                    expirationDate
                );


                this.handleAuthentication(
                        authResponseData.idToken,
                        authResponseData.email,
                        authResponseData.expiresIn,
                        authResponseData.userId
                        );
                        
                // return updated response        
                return user;
                        
                }),
                catchError(this.handleErrorService.handleError)
            );
        }






        private handleAuthentication(
            token: string,
            email: string,
            expiresIn: number,
            userId: string
            ) {
                
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                // 1. create instance of new user.
                // 2. we pass data to the 'User' class constaructor.
                //    this way we can store data.
                const user = new User(
                    email,
                    userId,
                    token,
                    expirationDate
                );

                // save data in local storage.   
                localStorage.setItem('userData', JSON.stringify(user));   

        }


}