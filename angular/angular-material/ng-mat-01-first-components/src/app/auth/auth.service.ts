import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";


// 1. We can inject services into services. And I want
//    to inject the 'angular router' into the 'auth.service.ts',
//    to be able to inject the service into a service we need 
//    add @Injectable() for our 'auth.service.ts' service.
@Injectable()

export class AuthService {


    // 1. So whenever we register a user, I want to emit an event.
    // 2. I'm going to pass a payload, which will be a boolean,
    //    indicating whether we are signed in or not.
    authChange = new Subject<boolean>();

    private user!: User | null;

    // 1. with 'router' we can navigate around programmatically.
    constructor(private router: Router) {}




    // register user
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000)
        };
        this.authSuccessfully();
    }



    // login user
    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000)
        };
        this.authSuccessfully();
    }




    // logout user
    logout() {
        this.user = null;
        console.log('logout...');
        console.log(this.user);
        this.authFailed();
    }




    // this way we can get our private user
    getUser() {
       // we will return new object. here we use SPREAD operator. 
       return { ...this.user }; 
    }



    
    // check if user is 'auth' (LoggedIn/LoggedOut)
    isAuth() {
        if(this.user !== null) {
            return this.user;
        } else {
            return null;
        }
    }




    private authSuccessfully() {
        // we pass 'true' value
        this.authChange.next(true);
        // navigate to '/training' page programmatically.
        this.router.navigate(['/training']);
    }



    
    private authFailed() {
        // we pass 'false' value
        this.authChange.next(false);
        // navigate to '/login' page programmatically.
        this.router.navigate(['/login']);
    }


}