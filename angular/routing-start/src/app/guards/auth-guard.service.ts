import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    CanActivateChild, 
    Router, 
    RouterStateSnapshot
 } from "@angular/router";
 
import { Observable } from "rxjs/Observable";
import { AuthService } from "../shared/auth.service";


@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;    
                    } else {
                        // here we can navigate with navigate method
                        this.router.navigate(['/']); // navigate to the root page
                        return false;
                    }
                }
            );
    }




    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }


    

}