

// **************************************************************************
// ****************************** Example 1: ********************************
// **************************************************************************



//  in case we use 'Lazy-loading feature modules' we need add 'canLoad' guard here instead 'canActivate'



// ************************* app-routing.module.ts ************************
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training.module').then((m) => m.TrainingModule),
      // in case we use 'Lazy-loading feature modules' we need add 'canLoad'
      // guard here instead 'canActivate'
      canLoad: [AuthGuard]
  },
];

@NgModule({
    // ********************** Preload lazy loaded feature modules begin ***********************
  // we pass second argument for 'preload lazy loaded modules'
  // we can add 'preloadingStrategy' as second argument in main routing module (with forRoot)
  // and set it to 'PreloadAllModules'. 
  // Default is 'NoPreloading'
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],


  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}












// *********************** auth.guard.ts **************************
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