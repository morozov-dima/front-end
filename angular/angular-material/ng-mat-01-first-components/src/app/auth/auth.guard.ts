import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    // we need connect our 'authService'
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isAuth()) {
            // user is 'logged in'
            return true;  
        } else {
            // user not 'logged in'
            // we want redirect the user to the 'login' page in 
            // our 'isAuth' methid return false.
            // otherwise we will return 'UrlTree'. redirect to current path.
            return this.router.createUrlTree(['/login']); 
         }
    }


    // We need this Guard when we use 'Lazy-loading feature modules'
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isAuth()) {
            // user is 'logged in'
            return true;  
        } else {
            // user not 'logged in'
            // we want redirect the user to the 'login' page in 
            // our 'isAuth' methid return false.
            // otherwise we will return 'UrlTree'. redirect to current path.
            return this.router.createUrlTree(['/login']); 
         }
    }


}