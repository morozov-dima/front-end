import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { AuthApiActions, AuthPageActions } from "./actions";
import { map, mergeMap, catchError, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./auth-user.model";



@Injectable()

export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}



    // ########################  LoginStart Effect #########################
    LoginStart$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthPageActions.LoginStart),
        mergeMap((action) => 
               // call 'login' method from 'authService' service. 
               this.authService.login(action.email, action.password).pipe(
                 map((user) => AuthApiActions.AuthenticateSuccess({user, redirect: true})),
                 catchError((error) => of(AuthApiActions.AuthenticateFail({ error })))
               )
        )
      );
    });
    // #####################################################################







    // #########################  Logout Effect ############################
    Logout$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AuthPageActions.Logout),
          tap(() => {
            // call to 'logout' method from 'authService' service.
            this.authService.logout();
          })
        ),
      { dispatch: false }
    );
    // #####################################################################







    // #######################  AuthRedirect Effect #########################
     // 1. current effect will run when 'AuthenticateSuccess' action
     //    will be applied. 
     // 2. we apply 'AuthenticateSuccess' action in 'LoginStart$' effect.
     AuthRedirect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AuthApiActions.AuthenticateSuccess),
          tap((action) => {
             if(action.redirect) {
               // navigate to home page
               this.router.navigate(['/']);
             }
          })
        ),
        { dispatch: false }
     );     
     // #####################################################################







    // #######################  AuthSignup Effect ######################
    AuthSignup$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(AuthPageActions.SignupStart),
          mergeMap((action) =>
            this.authService.signup(action.email, action.password).pipe(
              map((user) => AuthApiActions.AuthenticateSuccess({ user, redirect: true })),
              catchError((error) => of(AuthApiActions.AuthenticateFail({ error })))
            )
          )
        );
    });  
    // #####################################################################




    // #######################  AutoLogin Effect ######################
    AutoLogin$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthPageActions.AutoLogin),
        tap(() => {
          console.log('auto login effect test !!!');
        }),
         map(() => {
                  const localStorageData = localStorage.getItem('userData');
                  if (localStorageData) {
                    const user: User = JSON.parse(localStorage.getItem('userData') || '{}'); 
                    const isRedirect = (this.router.url).includes('auth') ? true : false; 
                    return AuthApiActions.AuthenticateSuccess({ user, redirect: isRedirect });
                  } else {
                    return { type: 'USER LOGOUT' };
                  }
            }
         )
      )
    });
    // #####################################################################











}