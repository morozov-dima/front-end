// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************



// ************************** canActivateUser.ts ***************************
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





// ************************* app.routing.module.ts ****************************
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PostsComponent } from "./posts/posts.component";
import { CanActivateUser } from "./shared/canActivateUser";
import { UsersComponent } from "./users/users.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'users', component: UsersComponent, canActivate: [CanActivateUser] },
    { path: 'posts', component: PostsComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
       RouterModule.forRoot(routes) 
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanActivateUser
    ]
})

export class AppRoutingModule {

}






















// **************************************************************************
// ****************************** Example 1: ********************************
// **************************************************************************


// **************************** auth.guard.ts *****************************
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








// ***************************** recipes-routing.module.ts  **********************************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';


// constant with our 'recipes' routes.
const routes: Routes = [
  {
    // here we use '' because we load our module lazy load.
    // and we already have 'recipes' path in 'app-routing.module.ts'
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];



// for each new feature module we add 'NgModule' decorator.
@NgModule({
  imports: [RouterModule.forChild(routes)],

  // we need export 'RouterModule' module
  exports: [RouterModule]
})
export class RecipesRoutingModule {}




















// **************************************************************************
// ****************************** Example 2: ********************************
// **************************************************************************

// ************* app/users/users.routing.module.ts ***********
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { AuthGuard } from '../auth/state/auth.guard';

const routes: Routes = [
    { 
        path: '',
        component: UsersShellComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class UsersRoutingModule {}










// ************* app.routing.module.ts ***********
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'promotions',
    loadChildren: () =>
      import('./promotions/promotions.module').then((m) => m.PromotionsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule), // ############# here we load users module !!! ##############
  },
  {
    path: 'auth',
    loadChildren: () => 
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '**', component: PageNotFoundComponent },
];



@NgModule({
  // 'PreloadAllModules' : Provides a preloading strategy
  //  that preloads all modules as quickly as possible.
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {}












// ************* app/auth/state/auth.guard.ts ***********
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
import { State } from 'src/app/state/app.state';
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


