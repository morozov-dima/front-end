import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class CanActivateUser implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
        ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | 
        UrlTree | 
        Observable<boolean | 
        UrlTree> | 
        Promise<boolean | 
        UrlTree> {
        if (this.authService.isAuthUser) {
            return of(true);   
        } else {
            // redirect to '/login?aceessDenied=true'
            return this.router.createUrlTree(['/login'], {
                queryParams: {aceessDenied: true}
            });
        }    
        
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | 
        UrlTree | 
        Observable<boolean | 
        UrlTree> | 
        Promise<boolean | 
        UrlTree> {
            return this.canActivate(childRoute, state);
    }

    

}