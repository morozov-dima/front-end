import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor() {}
    isAuthUser: boolean = false;
    authUser(isLoggedIn: boolean) {
        this.isAuthUser = isLoggedIn;
    }
}