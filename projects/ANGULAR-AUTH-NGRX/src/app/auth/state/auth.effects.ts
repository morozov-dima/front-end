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




     // current effect will run when 'AuthenticateSuccess' action will be applied.
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




    AutoLogin$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthPageActions.AutoLogin),
        tap(() => {
          console.log('auto login effect test !!!');
        }),
         map(() => {
                  const localStorageData = localStorage.getItem('userData');
                     
                  if (localStorageData) {
                    
                    const userData: {
                      email: string;
                      id: string;
                      _token: string;
                      _tokenExpirationDate: string;
                    } = JSON.parse(localStorage.getItem('userData') || '{}');
       

                    const loadedUser = new User(
                      userData.email,
                      userData.id,
                      userData._token,
                      new Date(userData._tokenExpirationDate)
                    );


                    this.authService.setLogoutTimer(600000);
                    
                    const isRedirect = (this.router.url).includes('auth') ? true : false; 
                    
                    return AuthApiActions.AuthenticateSuccess({ user: loadedUser, redirect: isRedirect });
                  } else {
                    return { type: 'USER LOGOUT' };
                  }
            }
         )
      )
    });




}