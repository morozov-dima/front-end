import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    RouterStateSnapshot
 } from "@angular/router";
 
import { Observable } from "rxjs/Observable";

export class AuthGuard implements CanActivate {




    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {
        return true;
    }

    

}