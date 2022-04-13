import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { AuthApiActions, AuthPageActions } from "./actions";
import { map, mergeMap, catchError, of, tap, EMPTY, take } from "rxjs";
import { Router } from "@angular/router";
import { UserApiActions } from "src/app/users/state/actions";


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
               this.authService.login(action.email, action.password).pipe(
                 map((authResponseData) => AuthApiActions.AuthenticateSuccess({authResponseData})),
                 catchError((error) => of(AuthApiActions.AuthenticateFail({ error })))
               )
        )
      );
    });





    Logout$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AuthPageActions.Logout),
          tap(() => {
            // call to 'logout' service
            this.authService.logout();
          })
        ),
      { dispatch: false }
    );





     // 1. current effect will run when 'AuthenticateSuccess' action
     //    will be applied. 
     // 2. we apply 'AuthenticateSuccess' action in 'LoginStart$' effect.
     AuthRedirect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AuthApiActions.AuthenticateSuccess),
          tap(() => {
              this.router.navigate(['/']);
          })
        ),
        { dispatch: false }
     );     




    AuthSignup$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(AuthPageActions.SignupStart),
          mergeMap((action) =>
            this.authService.signup(action.email, action.password).pipe(
              map((authResponseData) => AuthApiActions.AuthenticateSuccess({ authResponseData })),
              catchError((error) => of(AuthApiActions.AuthenticateFail({ error })))
            )
          )
        );
    });  




    AutoLogin$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthPageActions.AutoLogin),
        tap(() => {
          console.log('auto login effect !!!');
        }),
        mergeMap(() => 
          this.authService.autoLogin().pipe(
            map((authResponseData) => AuthApiActions.AuthenticateSuccess({ authResponseData })),
            catchError((error) => of(AuthApiActions.AuthenticateFail({ error })))
          )          
        )
      )
    });



}