import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable, take } from 'rxjs';
import { State } from 'src/app/state/app.reducer';
import { getAuthFeatureState, getUser } from './auth.selectors';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  // user not logged in  
  isAuthenticated: boolean = false;  

  constructor(
      private authService: AuthService,
      private store: Store<State>,
      private router: Router
  ) {}  

  canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {


        this.store.select('auth')
        .pipe(
            take(1)
        )
        .subscribe(
            response => {
                if(response) {
                    this.isAuthenticated = !!response.user;
                }    
            }
        );


        // check if user authenticated    
        if(this.isAuthenticated) {
            // in case user logged in and can visit current page.
            return true;
        } else {
            // in case user not logged in and can't visit current page.
            return this.router.createUrlTree(['/auth']);
        }    

   
    }
}
