import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { AuthApiActions, AuthPageActions } from "./actions";
import { map, mergeMap, catchError, of, tap, EMPTY } from "rxjs";
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




}