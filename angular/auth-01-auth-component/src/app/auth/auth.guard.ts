import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

// you could also add it to providers app module.
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    // we will use this 'canActivate' guard in front of the routes that we want to protect.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.authService.user.pipe(
           // we will use 'take(1)' to make shure that we always just take the
           // latest user value and then unsubscribe for this guard execution
           take(1),
           map(user => {
               // convert a tru-ish value, like an object, so anything that is not null or undefines to 'true'
               // so to real booleat.
               // or that converts false-ish value like 'null' or 'undefined' to a true boolean.
               const isAuth = !!user;
               if (isAuth) {
                return true;
               }
               // otherwise we will return 'UrlTree'. redirect to current path.
               return this.router.createUrlTree(['/auth']);
           })
       ); 
    }
}