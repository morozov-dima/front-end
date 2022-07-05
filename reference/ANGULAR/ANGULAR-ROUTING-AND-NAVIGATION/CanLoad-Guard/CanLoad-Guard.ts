// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************



// ************************* app-routing.module.ts ************************
//  in case we use 'Lazy-loading feature modules' we need add 'canLoad' guard here instead 'canActivate'
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: () =>  import('./training/training.module').then((m) => m.TrainingModule),  canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}












// ***************************** auth.guard.ts *******************************
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isAuth()) {
            // user is 'logged in'
            return true;  
        } else {
            // user not 'logged in', we redirect the user to the 'login' page in 
            // our 'isAuth' method return false, otherwise we will return 'UrlTree'. redirect to current path.
            return this.router.createUrlTree(['/login']); 
         }
    }

    // We need this Guard when we use 'Lazy-loading feature modules'
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isAuth()) {
            // user is 'logged in'
            return true;  
        } else {
            // user not 'logged in', we redirect the user to the 'login' page in 
            // our 'isAuth' method return false, otherwise we will return 'UrlTree'. redirect to current path.
            return this.router.createUrlTree(['/login']); 
         }
    }
}